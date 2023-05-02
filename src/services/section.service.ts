const getData = async(req:any, model:any, where:any) => {
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
    try {
        return await model.create({data:req})
    } catch (error) {
        return error
    }
}

const updateData = async (req:any, where:any, model:any) => {
    return await model.update({where: where, data: req})
}

export default {
    getData,
    createData,
    updateData,
}