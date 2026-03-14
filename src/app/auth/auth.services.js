const AppError = require("../../exception/appError")
const mailSvc = require("../../services/mail.services")
const { randomString } = require("../../utilities/helpers")
const UserModel = require("../user/user.model")

class AuthServices {
    transformRegisterData=(payload,file)=>{
        try {
            const user = payload
        if(file){
            user.profile = file.filename
        }
        user.otp = randomString(6)
        const timeAfterTwoHours = new Date(Date.now()+(60*2+60*1000)) 
        user.expiryTime = timeAfterTwoHours
        user.status= "inactive"
        return user
        } catch (exception) {
            throw exception
        }
    }

    store =  async (data)=>{
        try {
            const user = new UserModel(data)
            return await user.save()
        } catch (exception) {
            if(+exception.code ==11000){
               throw {message:"User Alreaady Exist",code:400}
            }
            throw exception
        }

    }
    userRegisterMail = async (to,name,otp,expiryTime)=>{
        try {
            return await mailSvc.sendEmail({
                to:to,
                sub:"Register USer",
              message:`
              <b>Hello ${name}</b></br>
              <b>OTP : ${otp}</b></br>
              <b>EXPIRY TIME : ${expiryTime}</b></br>
              `
            })
        } catch (exception) {
            throw exception
        }
    }

    getSingleUserDetails = async (data)=>{
            try {
                const user = await UserModel.findOne(data)
                return user
            } catch (exception) {
                throw exception
            }
    }

    updateUser = async (id,data)=>{
        try {
            const user = await UserModel.findByIdAndUpdate(id,{
                $set:data
            })

            return user
        } catch (exception) {
            throw exception
        }
    }
    sendActivateToken = async ({to,name,token,expiryTime})=>{
        try {
            return await mailSvc.sendEmail({
                to:to,
                sub:"Activation token",
                message:`
                <h1>Dear ${name}</h1><br>
                <h1>token ${token}</h1><br>
                <h1> Token  will be expire with 2 hours : ${expiryTime}</h1><br>
                <h1>Thank you..</h1><br>
                `
            })
        } catch (exception) {
            throw exception
        }
    }
    
    resendOtp = async ({to,name,otp})=>{
        try {
            return await mailSvc.sendEmail({
                to:to,
                sub:"Resend  OTP",
                message:`
                <h1>Dear ${name}</h1><br>
                <h1>otp ${otp}</h1><br>
                <h1> Otp  will be expire with 2 hours </h1><br>
                <h1>Thank you..</h1><br>
                `
            })
        } catch (exception) {
            throw exception
        }
    }
}
const authSvc = new AuthServices()
module.exports = authSvc