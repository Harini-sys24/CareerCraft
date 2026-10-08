import express from 'express';
import cors from 'cors';
import prisma from './config/db.js';

const app = express();

// Middleware: Cross-Origin Resource Sharing
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in dev mode
  },
  credentials: true
}));

// Middleware: Parse JSON request bodies
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected';
  let dbError = null;

  try {
    // Simple query to verify SQLite database connectivity via Prisma
    await prisma.$queryRawUnsafe('SELECT 1');
    dbStatus = 'connected';
  } catch (err) {
    dbError = err.message;
  }

  res.status(dbStatus === 'connected' ? 200 : 503).json({
    status: dbStatus === 'connected' ? 'ok' : 'degraded',
    service: 'CareerCraft API',
    database: dbStatus,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    ...(dbError && { error: dbError })
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CareerCraft API. Check /api/health for system status.',
    version: '1.0.0'
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});

export default app;
