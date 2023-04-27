import { errorReturn } from './../utils/customError'
import { RequestHandler, CookieOptions } from 'express'
import { clientService, authService } from '../services'
import { PrismaClient } from '@prisma/client'
import { customStatus, customResponse, wordReturn} from '../models/response'
import { genPassword } from '../utils/passwordGen'
import  bcrypt from 'bcrypt'
import config from 'config'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'minimal',
})

const cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
};

if (process.env.RUN_MODE === 'production') cookiesOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(
        Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
};
  
const getClients:RequestHandler = async(req:any,res:any) => {
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

    clientService.getData(req.query, prisma.sectionClient, where).then((data) => {
        const ress: customResponse = {
            statusCode: data.count != 0 ? customStatus.SUCCESS : customStatus.NOT_FOUND,
            total: data.count,
            data: data
        }
        
        res.status(ress.statusCode).json(ress)
    }).catch((err) => {
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    })
} 

const authClient: RequestHandler = async (req: any, res: any) => {
    const { clientID, clientSecret }  = req.body
    const where = {
        clientID: clientID.trim(),
        deleted: {
            equals: null
        }
    }

    const select = {
        clientSecret: true
    }

    try {
        const data = await clientService.findClient(prisma.sectionClient, where)
        console.log(data)

        let ress: customResponse = {
            statusCode: customStatus.BAD_REQUEST,
            data: wordReturn.AUTH_WRONG
        }

        if (data.count != 0) {
            const authStatus = await bcrypt.compare(
                clientSecret.trim(),
                data.result.clientSecret
            )

            if (authStatus) {

                const { accessToken, refreshToken } = await authService.authClient(data.result, 1)
                console.log("accessToken")
                console.log(accessToken)
                console.log("refreshToken")
                console.log(refreshToken)
                
                res.cookie('access_token', accessToken, accessTokenCookieOptions);
                res.cookie('refresh_token', refreshToken, refreshTokenCookieOptions);
                res.cookie('logged_in', true, {
                    ...accessTokenCookieOptions,
                    httpOnly: false,
                });

                ress.statusCode = customStatus.SUCCESS
                ress.data = accessToken
            }
        }

        res.status(ress.statusCode).json(ress)
    } catch (err) {
        const result = errorReturn(err)
        res.status(result.statusCode).json(result)
    }
}


const createClients:RequestHandler = async (req:any, res:any) => {

    let pass = genPassword(12)

    console.log(pass);
    
    const data = {
        nameTH: req.body.nameTH,
        nameEN: req.body.nameEN,
        clientSecret: await bcrypt.hash(pass, 12)
    }

    clientService.createData(data, prisma.sectionClient).then((data) => {
        const ress: customResponse = {
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
    authClient,
    createClients,
    
}
