import Joi from "joi"

const sortType = ["asc", "desc"]
const activeStatus = ["YES", "NO"]

const filterAndPagination = {
  query: Joi.object().keys({
    id: Joi.number(),
    keyword: Joi.string(),
    whereBy: Joi.string(),
    whereVal: Joi.string(),
    limit: Joi.number().min(0),
    offset: Joi.number().min(0),
    sortBy: Joi.string(),
    sortType: Joi.string().valid(...Object.values(sortType)).default("asc"),
  })
}

const createSection = {
  body: Joi.object().keys({
    code: Joi.string().required(),
    name: Joi.string().required(),
    isActive: Joi.string().valid(...Object.values(activeStatus)).default("1"),
    subdistrictID: Joi.number(),
  })
}

const updateSection = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    code: Joi.string().required(),
    name: Joi.string().required(),
    isActive: Joi.string().valid(...Object.values(activeStatus)).default("1"),
    subdistrictID: Joi.number(),
  })
}

const createClient = {
  body: Joi.object().keys({
    nameTH: Joi.string(),
    nameEN: Joi.string(),
  })
}

const auth = {
  body: Joi.object().keys({
    clientID: Joi.string().required(),
    clientSecret: Joi.string().required(),
  })
}

export default {
  filterAndPagination,
  createSection,
  updateSection,
  createClient,
  auth,
}
