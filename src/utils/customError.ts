import { Prisma } from '@prisma/client';
import { customStatus, customResponse } from '../models/response';

export const errorReturn = (error: any): customResponse => {
  const statusCode = (error.code === 'P2002' || error instanceof Prisma.PrismaClientValidationError) ? customStatus.BAD_REQUEST : customStatus.INTERNAL_SERVER_ERROR;
  const data = (error instanceof Prisma.PrismaClientKnownRequestError) ? error : error.message;
  return { statusCode, data };
}
