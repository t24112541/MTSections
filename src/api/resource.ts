import { PrismaClient } from "@prisma/client"

export const prismaResource = new PrismaClient({
    log: ['warn', 'error'],
    errorFormat: 'minimal',
})