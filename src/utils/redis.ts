import { createClient } from 'redis'
import thDate from './customDate'

const host = process.env.REDIS_HOST
const port = process.env.REDIS_PORT
const password = process.env.REDIS_PASS
const redisDB = Number(process.env.REDIS_DB)
const redisUrl = `redis://${host}:${port}`

const redisClient = createClient({
  url: redisUrl,
  password: password,
  database: redisDB
})

const connectRedis = async () => {
  try {
    let date = thDate
    await redisClient.connect()
    redisClient.set('init', date)
    console.log('Redis client connect success')
  } catch (error) {
    console.log('Redis client connect fail:' + error)
    setTimeout(connectRedis, 5000)
  }
};

connectRedis();

export default redisClient
