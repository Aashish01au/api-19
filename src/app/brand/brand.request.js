const Joi = require("joi");

const createBrandSchema = Joi.object({
    title:Joi.string().min(2).required(),
    image:Joi.object().empty(null,{}),
    slogan:Joi.string().required(),
    showInHome :Joi.bool().default(false),
    status:Joi.string().pattern(/^(active|inactive)$/).required()
}) 
const updateBrandSchema = Joi.object({
    title:Joi.string().min(2).required(),
    image:Joi.object().empty(null,{}),
    slogan:Joi.string().required(),
    showInHome :Joi.bool().default(false),
    status:Joi.string().pattern(/^(active|inactive)$/).required()
}) 

module.exports = {
    createBrandSchema,
    updateBrandSchema
}