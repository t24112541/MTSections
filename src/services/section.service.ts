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
    return await model.create({data:req})
}

export default {
    getData,
    createData
}