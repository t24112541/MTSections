import { customStatus, customResponse} from '../models/response'
import { Prisma } from '@prisma/client'

const getData = async(req:any, model:any, where:any) => {
    // try{
    //     const result = await model.findMany({
    //         where,
    //         orderBy: req.sortBy ? { [req.sortBy]: req.sortType } : undefined,
    //         skip: req.offset,
    //         take: req.limit,
    //     })
    //     const count = await model.count({where})

    //     const res: customResponse = {
    //         statusCode: count != 0 ? customStatus.SUCCESS : customStatus.NOT_FOUND,
    //         total: count,
    //         data: result
    //     }

    //     return res
    // }catch(error:any){
    //     return error
    // }

    const result = await model.findMany({
        where,
        orderBy: req.sortBy ? { [req.sortBy]: req.sortType } : undefined,
        skip: req.offset,
        take: req.limit,
    })
    const count = await model.count({where})

    return {result,count}
}

const createData = async (req:any, model:any) => {
    return await model.create({data:req})
}

export default {
    getData,
    createData
}