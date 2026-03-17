const Joi = require("joi");

const createBannerSchema = Joi.object({
    title:Joi.string().min(3).required(),
    image:Joi.object().required(),
    link:Joi.string().uri().required(),
    status:Joi.string().pattern(/^(active|inactive)$/).required()
}) 

module.exports = {
    createBannerSchema
}