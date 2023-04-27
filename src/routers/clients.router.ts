import express from 'express'
import multer from 'multer'
import { clients } from '../api'
import validate from '../middlewares/validate'
import { customRequest } from '../models'

const upload = multer()
const router= express.Router()

router.get('/', validate(customRequest.filterAndPagination), clients.getClients)
router.post('/auth', upload.none(), validate(customRequest.auth), clients.authClient)
router.post('/', upload.none(), validate(customRequest.createClient), clients.createClients)


module.exports = router