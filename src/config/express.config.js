const express = require("express")
const routes = require("../routes")
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
require("./mongodb.config")
app.use("/asset",express.static("./public/uploader/"))
app.use("/",routes)
app.use((req,res,next)=>{
    next({code:404, message:"Page not found"})
})
app.use((error,req,res,next)=>{
    console.log("Error Origin :",error)
    const statusCode = error.code ?? 500
    const message = error.message ?? "Inrenal Server Error"
    const result = error.data ?? null
    res.status(statusCode).json({
        result:result,
        message:message,
        meta:null
    })
})
module.exports = app