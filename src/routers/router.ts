import express,{Request,Response} from 'express'

const router = express.Router()
const location = require('./location.router')
const section = require('./section.router')
const clients = require('./clients.router')

module.exports = router

router.get('/', (req:Request, res:Response) => res.send("router"))

router.use('/location', location)
router.use('/section', section)
router.use('/clients', clients)