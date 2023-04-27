import express from 'express'
import multer from 'multer'
import { auth } from '../api'
import validate from '../middlewares/validate'
import { customRequest } from '../models'

const upload = multer({ 
    limits: { fileSize: 1 * 1024 * 1024 }
})

const router = express.Router()

router.post('/', upload.none(), validate(customRequest.auth), auth.authClient)
router.get('/refresh-token', auth.refreshToken)

module.exports = router