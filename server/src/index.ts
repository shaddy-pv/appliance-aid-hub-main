import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

const prisma = new PrismaClient();
const app = express();

// Environment validation
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// CORS configuration
const corsOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:8080', 'http://localhost:3000'];
app.use(cors({ 
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(logFormat));

// Cookie parser
app.use(cookieParser());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ 
    ok: true, 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRouter);

// Services endpoint with error handling
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({ 
      orderBy: { title: 'asc' },
      where: { /* Add any filters if needed */ }
    });
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Products endpoint with error handling
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({ 
      orderBy: { name: 'asc' },
      where: { /* Add any filters if needed */ }
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Auth guard
function requireAuth(req: any, res: any, next: any) {
  try {
    const token = req.cookies?.aah_access as string | undefined;
    if (!token) return res.status(401).json({ error: 'Unauthenticated' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as any;
    (req as any).userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthenticated' });
  }
}

// Orders
const CustomerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  addressLine1: z.string().min(5),
  addressLine2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(4),
});

const CartItemSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('product'), productId: z.string(), name: z.string(), price: z.number(), imageUrl: z.string().optional(), quantity: z.number().int().positive() }),
  z.object({ type: z.literal('service'), serviceId: z.string(), title: z.string(), price: z.number(), quantity: z.number().int().positive() }),
]);

const OrderSchema = z.object({
  items: z.array(CartItemSchema).min(1),
  subtotal: z.number().nonnegative(),
  customer: CustomerSchema,
  paymentMethod: z.enum(['cod', 'card', 'upi']),
});

app.post('/api/orders', requireAuth, async (req, res) => {
  try {
    const parsed = OrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: parsed.error.flatten() 
      });
    }

    const { items, subtotal, customer, paymentMethod } = parsed.data;

    const order = await prisma.order.create({
      data: {
        paymentMethod,
        subtotal,
        status: 'placed',
        customerFullName: customer.fullName,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        addressLine1: customer.addressLine1,
        addressLine2: customer.addressLine2 ?? null,
        city: customer.city,
        state: customer.state,
        postalCode: customer.postalCode,
        itemsJson: JSON.stringify(items),
      },
    });

    res.status(201).json({
      success: true,
      order,
      message: 'Order placed successfully'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      message: 'Please try again later'
    });
  }
});

// Bookings
const BookingSchema = z.object({
  serviceId: z.string(),
  preferredDate: z.string().min(1),
  preferredTimeSlot: z.string().min(1),
  customer: CustomerSchema,
  notes: z.string().optional(),
});

app.post('/api/bookings', requireAuth, async (req, res) => {
  try {
    const parsed = BookingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: parsed.error.flatten() 
      });
    }

    const { serviceId, preferredDate, preferredTimeSlot, customer, notes } = parsed.data;
    
    // Verify service exists
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const booking = await prisma.booking.create({
      data: {
        status: 'requested',
        serviceId,
        preferredDate,
        preferredTimeSlot,
        customerFullName: customer.fullName,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        addressLine1: customer.addressLine1,
        addressLine2: customer.addressLine2 ?? null,
        city: customer.city,
        state: customer.state,
        postalCode: customer.postalCode,
        notes: notes ?? null,
      },
    });
    
    res.status(201).json({
      success: true,
      booking,
      message: 'Booking request submitted successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      error: 'Failed to create booking',
      message: 'Please try again later'
    });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({ 
      orderBy: { createdAt: 'desc' },
      include: {
        // Add any relations if needed
      }
    });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Global error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Unhandled error:', error);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(500).json({
    error: 'Internal server error',
    message: isDevelopment ? error.message : 'Something went wrong',
    ...(isDevelopment && { stack: error.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
const port = Number(process.env.PORT || 4000);
const server = app.listen(port, () => {
  console.log(`🚀 API server listening on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle server errors
server.on('error', (error: any) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});


