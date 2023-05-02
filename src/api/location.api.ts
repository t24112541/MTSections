import { RequestHandler } from 'express'
import { locationService } from '../services'
import { prismaResource } from './resource'
import { errorReturn } from '../utils/customError'
import { customResponse, customStatus } from '../models/response'

const getGeography:RequestHandler = async(req:any, res:any) => {

    let keyword:string = req.query.keyword ?? ''
    const where = {
        OR: [
            { nameTH: { contains: keyword.trim() } },
            { nameEN: { contains: keyword.trim() } }
        ]
    }

    locationService.getData(req.query, prismaResource.locationGeography, where).then((result) => {
        const ress: customResponse = {
            statusCode: result.count != 0 ? customStatus.SUCCESS : customStatus.NOT_FOUND,
            total: result.count,
            data: result.res
        }
        
        res.status(ress.statusCode).json(ress)
    }).catch((err) => {
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    })
}

const getProvince:RequestHandler = async(req:any, res:any) => {
    let keyword:string = req.query.keyword ?? ''
    const where = {
        geographyID: req.query.id,
        OR: [
            { nameTH: { contains: keyword.trim() } },
            { nameEN: { contains: keyword.trim() } }
        ]
    }

    locationService.getData(req.query, prismaResource.locationProvince, where).then((result) => {
        const ress: customResponse = {
            statusCode: result.count != 0 ? customStatus.SUCCESS : customStatus.NOT_FOUND,
            total: result.count,
            data: result.res
        }
        
        res.status(ress.statusCode).json(ress)
    }).catch((err) => {
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    })
}

const getDistrict:RequestHandler = async(req:any, res:any) => {
    let keyword:string = req.query.keyword ?? ''
    const where = {
        provinceID: req.query.id,
        OR: [
            { nameTH: { contains: keyword.trim() } },
            { nameEN: { contains: keyword.trim() } }
        ]
    }

    locationService.getData(req.query, prismaResource.locationDistrict, where).then((result) => {
        const ress: customResponse = {
            statusCode: result.count != 0 ? customStatus.SUCCESS : customStatus.NOT_FOUND,
            total: result.count,
            data: result.res
        }
        
        res.status(ress.statusCode).json(ress)
    }).catch((err) => {
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    })
}

const getSubdistrict:RequestHandler = async(req:any, res:any) => {
    let keyword:string = req.query.keyword ?? ''
        const where = {
            districtID: req.query.id,
            OR: [
                { nameTH: { contains: keyword.trim() } },
                { nameEN: { contains: keyword.trim() } }
            ]
        }

    locationService.getData(req.query, prismaResource.locationSubdistrict, where).then((result) => {
        const ress: customResponse = {
            statusCode: result.count != 0 ? customStatus.SUCCESS : customStatus.NOT_FOUND,
            total: result.count,
            data: result.res
        }
        
        res.status(ress.statusCode).json(ress)
    }).catch((err) => {
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    })
}

export default {
    getGeography,
    getProvince,
    getDistrict,
    getSubdistrict
}
