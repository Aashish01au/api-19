const AppError = require("../../exception/appError")
const mailSvc = require("../../services/mail.services")
const { randomString } = require("../../utilities/helpers")
const authSvc = require("./auth.services")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
class AuthController{
    register = async (req,res,next)=>{
        try {
            const data = await authSvc.transformRegisterData(req.body,req.file)
            const user = await authSvc.store(data)
            //await authSvc.userRegisterMail(user.email,user.name,user.otp,user.expiryTime)
            res.json({
                result:user,
                message:"User Register Successfully",
                meta:null
            })
        } catch (exception) {
            console.log("RegisterFunction : ",exception)
            next(exception)
        }
    }
    verifyOTP = async ( req,res,next)=>{
        try {
            const {email,otp} = req.body
            const user =  await authSvc.getSingleUserDetails({
                email:email,
                otp:otp
            })
            if(!user){
                next(new AppError({message:"Otp is expiredd..",code:401}))
            }else{
                const authToken = randomString(100)
                const updatedUser = await authSvc.updateUser(user._id,{
                    authToken : authToken,
                    expiryTime : new Date(Date.now()+60*2*60*1000),
                    otp:null
                })
                await authSvc.sendActivateToken({to:user.email,name:user.name,token:authToken,expiryTime:updatedUser.expiryTime})
                res.json({
                    result:updatedUser,
                    message:"User verification succesful",
                    meta:null
                })
            }
        } catch (exception) {
            console.log("verifyOtp : ",exception)
            next(exception)
        }
    }
    resendOTP = async (req,res,next)=>{
        try {
            const email = req.body.email
            const user = await authSvc.getSingleUserDetails({
                email:email
            })
            if(!user){
                next(new AppError({message:"USer does not exist",code:401}))
            }else{
                const otp = randomString(6)
                const updatedUser = await authSvc.updateUser(user._id,{
                    otp : otp,
                    expiryTime : new Date(Date.now()+60*2*60*1000),
                })
                await authSvc.resendOtp({to:user.email,name:user.name,otp:otp})
                res.json({
                    result:updatedUser,
                    message:"Resend OTP succesful",
                    meta:null
                })
            }
        } catch (exception) {
            console.log("ResetOtp : ",exception)
            next(exception)
        }
    }
    activateUser =async (req,res,next)=>{
        try {
            const token = req.params.token
            const user = await authSvc.getSingleUserDetails({
                authToken:token
            })
            if(!user){
                next(new AppError({message:"User Does not exist", code:401}))
            }else{
              if(user.status ==="active"){
                next(new AppError({code:403,message:"user is already activated or ur account has been suspended,plz contact admin"}))
              }else{
                const password = bcrypt.hashSync(req.body.password,10)
                const updateUser = await authSvc.updateUser(user._id,{
                    password:password,
                    authToken:null,
                    status:"active",
                    expiryTime:null
                })
                res.json({
                    result:updateUser,
                    message:"User Actiavted Successfully",
                    meta:null
                })
              }
            }
        } catch (exception) {
            console.log("ActivateUser : ",exception)
            next(exception)
        }
    }
    loginUser = async (req,res,next)=>{
        try {
            const {email,password} = req.body
            const user = await authSvc.getSingleUserDetails({
                email:email
            })
            if(!user){
                next(new AppError({code:401, message:"User Does not exist"}))
            }else{
                if(user.status =="active"){
                    if(bcrypt.compareSync(password,user.password)){
                        const token  = jwt.sign({_id:user._id},process.env.JWT_SECRET,{
                            expiresIn:"1h"
                        })
                        const refreshToken  = jwt.sign({_id:user._id},process.env.JWT_SECRET,{
                            expiresIn:"1day"
                        })
                        res.json({
                            result:{
                                token:token,
                                type:"Bearer",
                                refreshToken:refreshToken
                            },
                            message:"login Successfully",
                            meta : null
                        })
                    }else{
                        next(new AppError({message:"inCorrect Pasword",code:401}))
                    }
                }else{
                    next(new AppError({message:"User is not activated yet"}))
                }
            }
        } catch (exception) {
            console.log("LoginUSer : ",exception)
            next(exception)
        }
    }

    profile = async (req,res,next)=>{
        try {
            const user = req.authUser
            res.json({
                result:{
                    _id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                    status:user.status
                },
                message:"User Profile",
                meta:null
            })
        } catch (exception) {
            console.log("USerProfileFunctions : ",exception)
            next(exception)
        }
    }
}
const authCtrl = new AuthController()
module.exports = authCtrl