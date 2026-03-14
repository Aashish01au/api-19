const ValidationError = require("../exception/validationError")

const bodyValidator = (schema,imagefield=null)=>{
    return async (req,res,next)=>{
        try {
            const data = req.body
            if(imagefield){
                if(req.file){
                    data["profile"]= req.file.filename
                }else if(req.files){
                    data["profile"] = req.file.filename
                }
            }
           await schema.validateAsync(data)
            next()
        } catch (exception) {
            console.log(exception)
            const errorBag = {}
            exception.details.map((error)=>{
                errorBag[error.context.key]= error.message
            })
            next( new ValidationError({data:errorBag}))
        }
    }
}
module.exports = bodyValidator