const nodemailer = require("nodemailer")
require("dotenv").config()
const AppError = require("../exception/appError")
class MailServices{
    transporter
    constructor(){
        try {
            this.transporter = nodemailer.createTransport({
                host:process.env.SMTP_HOST,
                port:process.env.SMTP_PORT,
                auth:{
                    user:process.env.SMTP_USER,
                    pass:process.env.SMTP_PASS
                }
            })
        } catch (exception) {
            throw  new AppError({message:"Error Connecting SMTP Mail Server"})
        }
    }

    sendEmail = ({to,sub,message})=>{
        try {
            this.transporter.sendMail({
                to:to,
                from:process.env.SMTP_FROM_ADDR,
                subject:sub,
                html:message,
                text:message
            })
        } catch (exception) {
            throw new AppError({message:"Error Sending Email.."})
        }
    }
}

const mailSvc = new MailServices()
module.exports = mailSvc