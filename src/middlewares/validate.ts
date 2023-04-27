import { NextFunction, Request, Response } from 'express'
import pick from '../utils/pick'
import Joi from 'joi'
import { customResponse, customStatus } from '../models/response'

const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body'])
  const obj = pick(req, Object.keys(validSchema))
  const { value, error } = Joi.compile(validSchema)
    .prefs({ 
      errors: { 
        label: 'key' 
      }, 
      abortEarly: false 
    })
    .validate(obj)

  if(error) {
    const errorMessage = error.details.map((details) => details.message).join(', ')
    const err: customResponse = {
      statusCode: customStatus.BAD_REQUEST,
      data: errorMessage,
    } 
    
    res.status(err.statusCode).json(err)
    return next(err.data)
  }

  Object.assign(req, value)

  return next()
}

export default validate