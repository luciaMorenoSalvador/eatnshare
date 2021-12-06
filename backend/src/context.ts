import { PrismaClient } from ".prisma/client"

const prismaClient = new PrismaClient()

export interface Context {
    db: PrismaClient
}

export const context: Context = {
    db: prismaClient
}