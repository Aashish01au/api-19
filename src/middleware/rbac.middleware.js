const AppError = require("../exception/appError")


const permissionCheck = (roles)=>{
    return (req,res,next)=>{
        const user = req.authUser
        if(
            (typeof roles ==="string" && user.role !==roles)
            ||
            (Array.isArray(roles) && !(roles.includes(user.role)))
        ){
            next(new AppError({message:"You do not have permission tomaccess the system.."}))
        }else{
            next()
        }
    }
}

module.exports = permissionCheck