import express from 'express'
import multer from 'multer'
import { clients } from '../api'
import validate from '../middlewares/validate'
import { customRequest } from '../models'
import requireJWT from '../middlewares/requireJWT'

const upload = multer({ 
    limits: { fileSize: 1 * 1024 * 1024 }
})

const router= express.Router()

router.get('/', requireJWT, validate(customRequest.filterAndPagination), clients.getClients)
router.post('/', upload.none(), validate(customRequest.createClient), clients.createClients)

module.exports = router