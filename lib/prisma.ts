import { PrismaClient } from '../app/generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}
const isTest= true
// const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())
const prismaBase = new PrismaClient()

const prisma = isTest
  ? prismaBase
  : prismaBase.$extends(withAccelerate())

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma