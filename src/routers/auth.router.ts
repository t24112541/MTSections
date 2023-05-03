import express from 'express'
import multer from 'multer'
import validate from '../middlewares/validate'
import { auth } from '../api'
import { customRequest } from '../models'

const upload = multer({ 
    limits: { fileSize: 1 * 1024 * 1024 }  // 1 MB
})

const router = express.Router()

router.post('/', upload.none(), validate(customRequest.auth), auth.authClient)
router.post('/logout', auth.logoutUserHandler)
router.get('/refresh-token', auth.refreshToken)

module.exports = router