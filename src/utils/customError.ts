import { Prisma } from '@prisma/client'
import { customStatus, customResponse } from '../models/response'

export const errorReturn = (error: any): customResponse => {
  const statusCode = (error instanceof Prisma.PrismaClientValidationError) ? customStatus.BAD_REQUEST : error.code
  const data = (error instanceof Prisma.PrismaClientKnownRequestError) ? error : error.message
  return { statusCode, data }
}
