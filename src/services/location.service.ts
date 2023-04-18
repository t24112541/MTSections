import { PrismaClient } from '@prisma/client'
import { status, customResponse} from '../models/response'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

const getGeography = async(req:any) => {
    try{
        let keyword:string = req.keyword ?? ''
        const where = {
            OR: [
                { NameTH: { contains: keyword.trim() } },
                { NameEN: { contains: keyword.trim() } }
            ]
        }

        const result = await prisma.locationGeography.findMany({
            where,
            orderBy: req.sortBy ? { [req.sortBy]: req.sortType } : undefined,
            skip: req.offset,
            take: req.limit,
        })
        const count = await prisma.locationGeography.count({where})
        
        const res: customResponse = {
            code: count != 0 ? status.SUCCESS : status.NOT_FOUND,
            total: count,
            data: result
        }

        return res
    }catch(error:any) {
        const res: customResponse = {
            code: status.SUCCESS,
            data: error.message 
        }
        
        return res
    }
}

export default {getGeography}
