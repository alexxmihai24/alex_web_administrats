/**
 * Utilidad de Prisma para Next.js
 * 
 * Esta configuración previene crear múltiples instancias de PrismaClient
 * durante el desarrollo con hot-reloading
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;
