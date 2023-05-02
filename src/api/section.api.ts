import { errorReturn } from './../utils/customError'
import { RequestHandler } from 'express'
import { sectionService } from '../services'
import { prismaResource } from './resource'
import { customStatus, customResponse} from '../models/response'

const getSection:RequestHandler = async(req:any, res:any) => {
    let keyword:string = req.query.keyword ?? ''
    const where = {
        OR: [
            { code: { contains: keyword.trim() } },
            { name: { contains: keyword.trim() } }
        ],
        deleted: {
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
    sectionService.createData(req.body, prismaResource.section).then((result)=>{
        const ress: customResponse = {
            statusCode: customStatus.CREATED,
            data: result
        }

        res.status(customStatus.CREATED).json(ress)
    }).catch((err)=>{
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    })
}

export default {
    getSection,
    createSection
}
