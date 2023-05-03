import express from 'express'
import multer from 'multer'
import validate from '../middlewares/validate'
import requireJWT from '../middlewares/requireJWT'
import { section } from '../api'
import { customRequest } from '../models'


const upload = multer({ 
    limits: { fileSize: 1 * 1024 * 1024 }  // 1 MB
})

const router= express.Router()

router.get('/', validate(customRequest.filterAndPagination), section.getSection)
router.post('/', requireJWT, upload.none(), validate(customRequest.createSection), section.createSection)
router.put('/', requireJWT, upload.none(), validate(customRequest.updateSection), section.updateSection)
router.delete('/:id', requireJWT, section.softDeleteSection)

module.exports = router