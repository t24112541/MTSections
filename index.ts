import express,{ Application} from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { authLimiter } from './src/middlewares/rateLimiter'
import { customResponse, status } from './src/models/response'

dotenv.config();

const app:Application = express();
const PORT:any = process.env.SERVER_PORT;
const router = require("./src/routers/router");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(cors());

app.use("/", authLimiter, router)

app.use((req, res, next) => {
  const err: customResponse = {
    code: status.NOT_FOUND,
    data: "API:NOT FOUND",
  } 
  res.status(err.code).json(err)
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
});