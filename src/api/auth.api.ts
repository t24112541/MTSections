import { errorReturn } from './../utils/customError'
import { RequestHandler, CookieOptions } from 'express'
import { clientService, authService } from '../services'
import { prismaResource } from './resource'
import { customStatus, customResponse, wordReturn} from '../models/response'
import  bcrypt from 'bcrypt'
import config from 'config'
import { signJwt, verifyJwt } from '../utils/jwt'
import redisClient from '../utils/redis'
import { clearCookie } from '../utils/cookie'

const cookiesOptions:CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
}
cookiesOptions.secure = (process.env.RUN_MODE === 'production' ? true : false)

const accessTokenCookieOptions:CookieOptions = {
    ...cookiesOptions,
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
};

const refreshTokenCookieOptions:CookieOptions = {
    ...cookiesOptions,
    expires: new Date(
        Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
};

const authClient:RequestHandler = async (req:any, res:any) => {
    const { clientID, clientSecret }  = req.body
    const where = {
        clientID: clientID.trim(),
        deleted: {
            equals: null
        }
    }

    try {
        let ress:customResponse = {
            statusCode: customStatus.BAD_REQUEST,
            data: wordReturn.AUTH_WRONG
        }

        const client = await clientService.findClient(prismaResource.sectionClient, where)
        if (client.count != 0) {
            const authStatus = await bcrypt.compare(
                clientSecret.trim(),
                client.result.clientSecret
            )

            if (authStatus) {
                const { accessToken, refreshToken } = await authService.authClient(client.result)

                res.cookie('accessToken', accessToken, accessTokenCookieOptions)
                res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
                res.cookie('loggedIn', true, {
                    ...accessTokenCookieOptions,
                    httpOnly: false,
                });

                ress.statusCode = customStatus.SUCCESS
                ress.data = {
                    accessToken: accessToken
                } 
            }
        }

        res.status(ress.statusCode).json(ress)
    } catch (err) {
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    }
}

const refreshToken = async (req:any, res:any) => {
    try {
        let ress:customResponse = {
            statusCode: customStatus.UNAUTHORIZED,
            data: wordReturn.AUTH_UNAUTHORIZED
        }
    
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken){
            return res.status(ress.statusCode).json(ress)
        }

        const decode = verifyJwt<{sub:string}>(refreshToken, "refreshTokenPublicKey")

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
            ID: JSON.parse(session).ID,
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

        const accessToken = signJwt({sub: client.result.clientID}, 'accessTokenPrivateKey', {
            expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`
        })
    
        res.cookie('accessToken', accessToken, accessTokenCookieOptions)
        res.cookie('loggedIn', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });
    
        ress.statusCode = customStatus.SUCCESS
        ress.data = {
            accessToken: accessToken
        } 

        res.status(ress.statusCode).json(ress)
    } catch (err:any) {
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    }
}

const logoutUserHandler = async (req: any, res: any) => {
    try {
        const ress: customResponse = {
            statusCode: customStatus.UNAUTHORIZED,
            data: wordReturn.AUTH_UNAUTHORIZED,
        }

        const refreshToken = req.cookies.refreshToken
        if(!refreshToken){
            return res.status(ress.statusCode).json(ress)
        }

        const decode = verifyJwt<{sub: string}>(refreshToken, 'refreshTokenPublicKey')
        if(!decode){
            ress.statusCode = customStatus.BAD_REQUEST
            ress.data = wordReturn.AUTH_TOKEN_EXPIRED
            return res.status(ress.statusCode).json(ress)
        }

        await redisClient.del(decode.sub)
        clearCookie(res)
        ress.statusCode = customStatus.SUCCESS
        ress.data = wordReturn.SUCCESS
        return res.status(ress.statusCode).json(ress)
    } catch (error: any) {
        const ress: customResponse = {
            statusCode: customStatus.INTERNAL_SERVER_ERROR,
            data: error.message,
        }

        return res.status(ress.statusCode).json(ress)
    }
}

export default {
    authClient,
    refreshToken,
    logoutUserHandler
}
