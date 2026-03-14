const jwt = require("jsonwebtoken")
const authSvc = require("../app/auth/auth.services")
const ValidationError = require("../exception/validationError")
require("dotenv").config()
const auth = async (req,res,next)=>{
    let token = null
    if(req.headers['authorization']){
        token = req.headers["authorization"]
    }
    if(!token){
        next({code:400,message:"Token is required.."})
    }else{
        token = token.split(" ").pop()
        if(!token){
            next({code:400,message:"Token is not set yet.."})
        }else{
            const data = jwt.verify(token,process.env.JWT_SECRET)
            const user = await authSvc.getSingleUserDetails({
                _id:data._id
            })
            if(!user){
                next(new ValidationError({message:"User Does not exist anyMore.."}))
            }
            req.authUser = user
            next()
        }
    }
}

module.exports = auth