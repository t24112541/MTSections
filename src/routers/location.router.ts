
import express from 'express'
import multer from 'multer'
import { location } from '../api'

const upload = multer()
const router= express.Router()

router.get('/geography', upload.none(), location.getGeography)

module.exports = router