import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();
const app = express();

app.use(cors({ 
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Simple password hashing without argon2
function simpleHash(password) {
  return crypto.createHash('sha256').update(password + 'salt').digest('hex');
}

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Simple registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    
    if (!email || !fullName || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    // Create user with simple hash
    const passwordHash = simpleHash(password);
    const user = await prisma.user.create({
      data: { email, fullName, passwordHash }
    });
    
    res.status(201).json({ 
      id: user.id, 
      email: user.email, 
      fullName: user.fullName 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Simple login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    const passwordHash = simpleHash(password);
    if (user.passwordHash !== passwordHash) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    res.json({ 
      id: user.id, 
      email: user.email, 
      fullName: user.fullName 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Me endpoint
app.get('/api/auth/me', async (req, res) => {
  try {
    // For now, return a simple response
    res.json({ id: '1', email: 'test@test.com', fullName: 'Test User' });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Failed to get user info' });
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`🚀 Simple server running on http://localhost:${port}`);
  console.log('✅ Registration and login endpoints ready!');
});
