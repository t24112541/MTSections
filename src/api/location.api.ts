
import { RequestHandler } from 'express'
import { status, customResponse } from '../models/response'
import { locationService } from '../services'
import  request  from '../models/request.model'

const getGeography:RequestHandler = async(req:any,res:any) => {
    try{
        const { value } = request.reqGeography.validate(req.query)
        const result = locationService.getGeography(value)


        res.status((await result).code).json((await result))
    }catch(error:any) {
        const err: customResponse = {
            code: status.INTERNAL_SERVER_ERROR,
            data: error.message,
        }
        
        res.status(err.code).json(err)
    }
}

export default {getGeography}
