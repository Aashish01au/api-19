const Joi = require("joi");

const createCategorySchema = Joi.object({
    title:Joi.string().min(2).required(),
    image:Joi.object().empty(null,{}),
   parentId:Joi.string().empty(null,""),
    showInHome :Joi.bool().default(false),
     showInMenu :Joi.bool().default(false),
    status:Joi.string().pattern(/^(active|inactive)$/).required()
}) 
const updateCategorySchema = Joi.object({
    title:Joi.string().min(2).required(),
    image:Joi.object().empty(null,{}),
   parentId:Joi.string().empty(null,""),
    showInHome :Joi.bool().default(false),
     showInMenu :Joi.bool().default(false),
    status:Joi.string().pattern(/^(active|inactive)$/).required()
}) 

module.exports = {
    createCategorySchema,
    updateCategorySchema
}