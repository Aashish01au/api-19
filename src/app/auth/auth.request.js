const Joi = require("joi")
const addressSchema = Joi.object({
    stName:Joi.string().required(),
    lat:Joi.number().required(),
    long:Joi.number().required(),
    wardNo:Joi.number().required(),
    district:Joi.string().required(),
    state:Joi.string().required(),
})
const registerSchema = Joi.object({
    name :Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    profile:Joi.string(),
    address:{
        billing:addressSchema.default(null),
        shipping:addressSchema.default(null)
    },
    role:Joi.string().regex(/^(admin|selelr|customer)$/).default("customer").required(),
    status:Joi.string().regex(/^(active|inactive)$/)
})

const verifyOTPSchema = Joi.object({
    email:Joi.string().email().required(),
    otp: Joi.string().length(6).required()
})

const resetOtpSchema = Joi.object({
    email:Joi.string().email().required()
})
const passwordSchema = Joi.object({
    password:Joi.string().min(8).required(),
    confirmPassword:Joi.string().valid(Joi.ref("password")).messages({"any.only":"passwprd and confirm password must be same"}).required()
})
const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})
module.exports= {
    registerSchema,
    verifyOTPSchema,
    resetOtpSchema,
    passwordSchema,
    loginSchema
}