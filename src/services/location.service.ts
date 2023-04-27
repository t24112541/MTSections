const getData = async(req:any, model:any, where:any) => {
    const res = await model.findMany({
        where,
        orderBy: req.sortBy ? { [req.sortBy]: req.sortType } : undefined,
        skip: req.offset,
        take: req.limit,
    })
    const count = await model.count({where})

    return {res, count}
}

export default {
    getData
}