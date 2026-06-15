import { PrismaClient } from '@prisma/client'

/**
 * Prisma Client Singleton for Next.js 15+ / Turbopack.
 * Uses globalThis to ensure only one instance of Prisma Client is 
 * instantiated in development, preventing connection limits.
 */

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
