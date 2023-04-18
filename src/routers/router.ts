import express,{Request,Response} from 'express'

const router = express.Router()
const location = require('./location.router')

module.exports = router

router.get('/', (req:Request, res:Response) => res.send("router"));

router.use('/location', location);
