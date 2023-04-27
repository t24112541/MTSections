import express from 'express'
import multer from 'multer'
import { location } from '../api'
import validate from '../middlewares/validate'
import { customRequest } from '../models'

const router= express.Router()

router.get('/geography', validate(customRequest.filterAndPagination), location.getGeography)
router.get('/province', validate(customRequest.filterAndPagination), location.getProvince)
router.get('/district', validate(customRequest.filterAndPagination), location.getDistrict)
router.get('/subdistrict', validate(customRequest.filterAndPagination), location.getSubdistrict)

module.exports = router