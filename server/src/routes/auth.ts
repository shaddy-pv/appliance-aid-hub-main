import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const prisma = new PrismaClient();
export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function signAccessToken(userId: string) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  const ttl = Number(process.env.ACCESS_TOKEN_TTL_MINUTES || '15');
  return jwt.sign({ sub: userId }, secret, { expiresIn: `${ttl}m` });
}

async function createRefreshToken(userId: string) {
  const raw = crypto.randomBytes(32).toString('hex');
  const tokenHash = await argon2.hash(raw, { type: argon2.argon2id });
  const ttlDays = Number(process.env.REFRESH_TOKEN_TTL_DAYS || '14');
  const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);
  await prisma.refreshToken.create({ data: { userId, tokenHash, expiresAt } });
  return raw;
}

function setAuthCookies(res: any, accessToken: string, refreshToken: string) {
  const isProd = process.env.NODE_ENV === 'production';
  const domain = process.env.COOKIE_DOMAIN || undefined;
  res.cookie('aah_access', accessToken, { httpOnly: true, sameSite: 'lax', secure: isProd, maxAge: 1000 * 60 * Number(process.env.ACCESS_TOKEN_TTL_MINUTES || '15'), domain });
  res.cookie('aah_refresh', refreshToken, { httpOnly: true, sameSite: 'lax', secure: isProd, maxAge: 1000 * 60 * 60 * 24 * Number(process.env.REFRESH_TOKEN_TTL_DAYS || '14'), domain });
}

authRouter.post('/register', async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input data', details: parsed.error.flatten() });
    }
    const { email, fullName, password } = parsed.data;
    
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    const user = await prisma.user.create({ data: { email, fullName, passwordHash } });
    const access = signAccessToken(user.id);
    const refresh = await createRefreshToken(user.id);
    setAuthCookies(res, access, refresh);
    
    res.status(201).json({ id: user.id, email: user.email, fullName: user.fullName });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
    const { email, password } = parsed.data;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    const access = signAccessToken(user.id);
    const refresh = await createRefreshToken(user.id);
    setAuthCookies(res, access, refresh);
    
    res.json({ id: user.id, email: user.email, fullName: user.fullName });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

authRouter.post('/logout', async (req, res) => {
  res.clearCookie('aah_access');
  res.clearCookie('aah_refresh');
  res.status(204).end();
});

authRouter.post('/refresh', async (req, res) => {
  const token = req.cookies?.aah_refresh as string | undefined;
  if (!token) return res.status(401).json({ error: 'No refresh' });
  const tokens = await prisma.refreshToken.findMany({ orderBy: { createdAt: 'desc' } });
  let owner: string | null = null;
  for (const t of tokens) {
    const match = await argon2.verify(t.tokenHash, token).catch(() => false);
    if (match && !t.revokedAt && t.expiresAt > new Date()) { owner = t.userId; break; }
  }
  if (!owner) return res.status(401).json({ error: 'Invalid refresh' });
  const access = signAccessToken(owner);
  const refresh = await createRefreshToken(owner);
  setAuthCookies(res, access, refresh);
  res.json({ ok: true });
});

authRouter.get('/me', async (req, res) => {
  try {
    const token = req.cookies?.aah_access as string | undefined;
    if (!token) return res.status(401).json({ error: 'Unauthenticated' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as any;
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(401).json({ error: 'Unauthenticated' });
    res.json({ id: user.id, email: user.email, fullName: user.fullName });
  } catch {
    res.status(401).json({ error: 'Unauthenticated' });
  }
});


