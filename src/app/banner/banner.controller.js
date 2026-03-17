const AppError = require("../../exception/appError")
const bannerSvc = require("./banner.services")

class BannerController{
   create = async (req,res,next)=>{
        try {
            const data = await  bannerSvc.transformCreateBanner(req.body, req.authUser)
            const banner = await bannerSvc.store(data)
            res.json({
                result:banner,
                message:"Banner Creatd Successfully",
                meta :null
            })
        } catch (exception) {
            console.log("CreateBannerfunctions :",exception)
            next(exception)
        } 
    }
    index = async (req,res,next)=>{
        try {
            const page = req.query.page ?? 1
            const limit = req.query.limit ?? 1
            const skip = (page-1)*limit
            const search = req.query.search ?? null
            let filter = {}
            if(search){
                filter={
                    ...filter,
                    $or:[{title:new RegExp(search,"i")},
                    {status:new RegExp(search,"i")},
                    {link:new RegExp(search,"i")}
                    ]
                }
            }
            const count = await bannerSvc.totalCount(filter)
            const banners = await bannerSvc.getAllBanners(filter,skip,limit)
            res.json({
                result:banners,
                message:"Banners Data Fetched Successfully",
                meta:{
                    total:count,
                    limit:limit,
                    page:page
                }
            })
        } catch (exception) {
            console.log("IndexBannerfunctions :",exception)
            next(exception)
        } 
    }
    update = async (req,res,next)=>{
        try {
            
        } catch (exception) {
            console.log("UpdateBannerfunctions :",exception)
            next(exception)
        } 
    }
    detail = async (req,res,next)=>{
        try {
            const id  = req.params.id
            const banner = await bannerSvc.getBannerById(id)
            if(banner){
                res.json({
                    result:banner,
                    message:"Banner Detail",
                    meta:null
                })
            }else{
                next(new AppError({message:"Banner Does not exist", code:400}))
            }
        } catch (exception) {
            console.log("DeleteBannerfunctions :",exception)
            next(exception)
        } 
    }
    delete = async (req,res,next)=>{
        try {
            const  id = req.params.id 
            const banner = await  bannerSvc.deleteBanner(id)
            res.json({
                result:banner,
                message:"Banner Deletde Sccuessfully",
                meta :null
            })
        } catch (exception) {
            console.log("DetailBannerfunctions :",exception)
            next(exception)
        } 
    }
   
    homeList = async (req,res,next)=>{
        try {
            
        } catch (exception) {
            console.log("HomeListBannerfunctions :",exception)
            next(exception)
        } 
    }
}
const bannerCtrl = new BannerController()
module.exports = bannerCtrl