import { errorReturn } from './../utils/customError'
import { RequestHandler } from 'express'
import { sectionService } from '../services'
import { prismaResource } from './resource'
import { customStatus, customResponse, wordReturn } from '../models/response'
import { getISODate } from '../utils/customDate'

const getSection:RequestHandler = async(req:any, res:any) => {
    let keyword:string = req.query.keyword ?? ''
    const where = {
        OR: [
            { code: { contains: keyword.trim() } },
            { name: { contains: keyword.trim() } }
        ],
        deletedAt: {
            equals: null
        }
    }

    sectionService.getData(req.query, prismaResource.section, where).then((result) => {
        const ress: customResponse = {
            statusCode: result.count != 0 ? customStatus.SUCCESS : customStatus.NOT_FOUND,
            total: result.count,
            data: result
        }
        
        res.status(ress.statusCode).json(ress)
    }).catch((err) => {
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    })
} 

const createSection:RequestHandler = async (req:any, res:any) => {
    sectionService.createData(req.body, prismaResource.section).then((result) => {
        const ress: customResponse = {
            statusCode: result.code === "P2002" ? customStatus.BAD_REQUEST : customStatus.CREATED,
            data: result
        }

        res.status(ress.statusCode).json(ress)
    }).catch((err) => {
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    }) 
}

const updateSection:RequestHandler = async (req:any, res:any) => {
    const where = {
        id: req.body.id,
    }

    sectionService.updateData(req.body, where, prismaResource.section).then((result) => {
        const ress: customResponse = {
            statusCode: customStatus.SUCCESS,
            data: result
        }

        res.status(ress.statusCode).json(ress)
    }).catch((err)=>{
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    })
}

const softDeleteSection:RequestHandler = async (req:any, res:any) => {
    const where = {
        ID: parseInt(req.params.id)
    }
 
    const date = new Date(getISODate())
    const request = {
        deletedAt: date
    }

    sectionService.updateData(request, where, prismaResource.section).then((result) => {
        const ress: customResponse = {
            statusCode: customStatus.SUCCESS,
            data: wordReturn.SUCCESS
        }

        res.status(ress.statusCode).json(ress)
    }).catch((err)=>{
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    })
}

export default {
    getSection,
    createSection,
    updateSection,
    softDeleteSection
}
