import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { authLimiter } from './src/middlewares/rateLimiter'
import { customResponse, customStatus } from './src/models/response'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

let conn = prisma.$connect()

conn.catch((e)=>{
  throw new Error(e.message)
})

dotenv.config()

const app = express()
const PORT = process.env.SERVER_PORT
const router = require("./src/routers")
const allowOrigins = ["*"]
const corsOptions = {
  origin: (origin:any, callback:any) => {
    if(allowOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error("BLOCKED BY CORS"))
    }
  }
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(helmet())
app.use(helmet.hidePoweredBy())

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
