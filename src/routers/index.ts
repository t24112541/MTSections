import express from 'express'

const router = express.Router()
const location = require('./location.router')
const section = require('./section.router')
const clients = require('./clients.router')
const auth = require('./auth.router')

module.exports = router

router.use('/location', location)
router.use('/section', section)
router.use('/clients', clients)
router.use('/auth', auth)