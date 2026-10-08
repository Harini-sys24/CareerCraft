import { PrismaClient } from '@prisma/client';

// Singleton instance of PrismaClient
// In development, prevents creating too many connections on file reload
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
});

export default prisma;
