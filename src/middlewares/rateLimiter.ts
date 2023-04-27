
import rateLimit from 'express-rate-limit'

export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,    // min
  max: 50,                    // user request 50 times per ^^^
  skipSuccessfulRequests: true
})