import { NextFunction, Request, Response } from 'express'
import { customResponse, customStatus, wordReturn } from '../models/response'
import { verifyJwt } from '../utils/jwt'
import redisClient from '../utils/redis'
import { prismaResource } from '../api/resource'
import { clientService } from '../services'

const requireJWT = async (req:Request, res:Response, next:NextFunction) => {
    try {
        let accessToken

        const ress: customResponse = {
            statusCode: customStatus.UNAUTHORIZED,
            data: wordReturn.AUTH_UNAUTHORIZED,
        } 

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            accessToken = req.headers.authorization.split(' ')[1]
        }else if (req.cookies.accessToken){
            accessToken = req.cookies.accessToken
        }
        
        if(!accessToken){
            return res.status(ress.statusCode).json(ress)
        }

        const decode = verifyJwt<{sub: string}>(accessToken, 'accessTokenPublicKey')
        if(!decode){
            ress.statusCode = customStatus.BAD_REQUEST
            ress.data = wordReturn.AUTH_TOKEN_EXPIRED
            return res.status(ress.statusCode).json(ress)
        }

        const session = await redisClient.get(decode.sub)

        if(!session){
            ress.data = wordReturn.AUTH_SESSION_EXPIRED
            return res.status(ress.statusCode).json(ress)
        }

        const where = {
            ID: JSON.parse(session).id,
            deleted: {
                equals: null
            }
        }
    
        const client = await clientService.findClient(prismaResource.sectionClient, where)
        if(client.count === 0){
            ress.statusCode = customStatus.NOT_FOUND
            ress.data = wordReturn.AUTH_CLIENT_NOT_FOUND
            return res.status(ress.statusCode).json(ress)
        }

        next()
    } catch (error:any) {
        next(error)
    }
}   

export default requireJWT