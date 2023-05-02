import { errorReturn } from './../utils/customError'
import { RequestHandler } from 'express'
import { clientService } from '../services'
import { prismaResource } from './resource'
import { customStatus, customResponse } from '../models/response'
import { genPassword } from '../utils/passwordGen'
import  bcrypt from 'bcrypt'

const getClients:RequestHandler = async(req:any, res:any) => {
    let keyword:string = req.query.keyword ?? ''
    const where = {
        OR: [
            { clientID: { contains: keyword.trim() } },
            { nameTH: { contains: keyword.trim() } },
            { nameEN: { contains: keyword.trim() } }
        ],
        deleted: {
            equals: null
        }
    }

    clientService.getData(req.query, prismaResource.sectionClient, where).then((data) => {
        const ress:customResponse = {
            statusCode: data.count != 0 ? customStatus.SUCCESS : customStatus.NOT_FOUND,
            total: data.count,
            data: data.result
        }
        
        res.status(ress.statusCode).json(ress)
    }).catch((err) => {
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    })
} 

const createClients:RequestHandler = async (req:any, res:any) => {
    let pass = genPassword(12)

    const data = {
        nameTH: req.body.nameTH,
        nameEN: req.body.nameEN,
        clientSecret: await bcrypt.hash(pass, 12)
    }

    clientService.createData(data, prismaResource.sectionClient).then((data) => {
        const ress:customResponse = {
            statusCode: customStatus.CREATED,
            data: data
        }
        ress.data.clientSecret = pass
        
        res.status(customStatus.CREATED).json(ress)
    }).catch((err)=>{
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    })
}

export default {
    getClients,
    createClients,
}
