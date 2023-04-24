import express from 'express'
import multer from 'multer'
import { section } from '../api'
import validate from '../middlewares/validate'
import { customRequest } from '../models'

const upload = multer()
const router= express.Router()

router.get('/', validate(customRequest.filterAndPagination), section.getSection)
router.post('/', upload.none(), validate(customRequest.createSection), section.createSection)

module.exports = router