import express,{ Application} from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authLimiter } from './src/middlewares/rateLimiter'
import { customResponse, customStatus } from './src/models/response'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

let conn = prisma.$connect()

conn.catch((e)=>{
  throw new Error(e.message)
})

dotenv.config()

const app:Application = express()
const PORT:any = process.env.SERVER_PORT
const router = require("./src/routers/router")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())

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
