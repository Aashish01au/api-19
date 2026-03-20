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
            const {page,skip,limit} = await bannerSvc.getSkippedCalculated(req.query)
            const search = req.query.search || null
            let filter = await bannerSvc.getSearchQuery(search)
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
            const banner = await bannerSvc.getBannerById(req.params.id)
            if(banner){
                const data = await bannerSvc.transformUpdateBanner(req,banner)
                const updatedBanner = await bannerSvc.updateBanner(banner._id,data)
                res.json({
                    result:updatedBanner,
                    message:"banner updated",
                    meta:null
                })
            }else{
                next( new AppError({message:"banner doies not exitt",code:400}))
            }
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
            const banners =   await  bannerSvc.getActiveBanner()
            res.json({
                result:banners,
                message:"Home List",
                meta:null
            })
        } catch (exception) {
            console.log("HomeListBannerfunctions :",exception)
            next(exception)
        } 
    }
}
const bannerCtrl = new BannerController()
module.exports = bannerCtrl