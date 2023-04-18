import Joi from "joi";

const sortType = ["asc", "desc"];

const reqGeography = Joi.object({
  keyword: Joi.string(),
  limit: Joi.number(),
  offset: Joi.number(),
  sortBy: Joi.string(),
  sortType: Joi.string().valid(...Object.values(sortType)),
})

export default {
  reqGeography
}
