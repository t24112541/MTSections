import express from 'express'
import multer from 'multer'
import validate from '../middlewares/validate'
import { clients } from '../api'
import { customRequest } from '../models'
import requireJWT from '../middlewares/requireJWT'

const upload = multer({ 
    limits: { fileSize: 1 * 1024 * 1024 }  // 1 MB
})

const router= express.Router()

router.get('/', requireJWT, validate(customRequest.filterAndPagination), clients.getClients)
router.post('/', requireJWT, upload.none(), validate(customRequest.createClient), clients.createClients)

module.exports = router