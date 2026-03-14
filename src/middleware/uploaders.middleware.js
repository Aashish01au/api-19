const multer = require("multer")
const fs = require("fs")
const { randomString } = require("../utilities/helpers")
const uploaderPath = (dirName)=>{
    return (req,res,next)=>{
        req.uploaderPath = dirName
        next()
    }
}
const myStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
    const path = "./public/uploader/"+ req.uploaderPath
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{
                recursive:true
            })
        }
        cb(null,path)
    },
    filename:(req,file,cb)=>{
        const ext = file.originalname.split(".").pop()
        const fileName = Date.now()+"-"+randomString(10)+"." +ext
        cb(null,fileName)
    }
})
const imageFilter = (req,file,cb)=>{
    const ext =  file.originalname.split(".").pop()
    if(
        ["jpg","png","jpeg","svg","gif","webp"].includes(ext.toLowerCase())
    ){
        cb(null,true)
    }else{
        cb({message:{
            image:"File type not supported"
        },code:401},null)
    }
}
const uploader = multer({
    storage:myStorage,
    fileFilter:imageFilter,
    limits:{
        fileSize:2000000
    }
})

module.exports = {
    uploader,
    uploaderPath
}