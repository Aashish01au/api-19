const ValidationError = require("../exception/validationError")

const bodyValidator = (schema,imagefieldName=null)=>{
    return async (req,res,next)=>{
        try {
            const data = req.body
           if(imagefieldName){
            if(req.file){
                data[imagefieldName]= req.file
            }else if(req.files){
                data[imagefieldName]= req.files
            }else{
                data[imagefieldName]= null
            }
           }
           console.log(data)
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