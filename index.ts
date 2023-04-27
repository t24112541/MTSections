import express,{ Application} from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { authLimiter } from './src/middlewares/rateLimiter'
import { customResponse, customStatus } from './src/models/response'
import { PrismaClient } from '@prisma/client'

// const session = require('express-session')
// const RedisStore = require('connect-redis')(session)
// const passport = require('passport')

const prisma = new PrismaClient()

let conn = prisma.$connect()

conn.catch((e)=>{
  throw new Error(e.message)
})

dotenv.config()

const app:Application = express()
const PORT:any = process.env.SERVER_PORT
const router = require("./src/routers/router")

// REDIS_PASS
// REDIS_HOST
// REDIS_PORT

// const redisPass = process.env.REDIS_PASS
// const redisHost = process.env.REDIS_HOST
// const redisPort = process.env.REDIS_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())
// app.use(session({
//   store: new RedisStore({
//     url: `redis://${redisPass}@${redisHost}/${redisPort}`
//   }),
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())

app.use("/", authLimiter, router)

app.use((_, res) => {
  const err: customResponse = {
    statusCode: customStatus.NOT_FOUND,
    data: "API:NOT FOUND",
  } 
  
  res.status(err.statusCode).json(err)
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
