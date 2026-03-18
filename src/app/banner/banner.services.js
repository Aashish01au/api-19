const AppError = require("../../exception/appError")
const BannerModel = require("./banner.model")

class BannerServices{
    transformCreateBanner= (data,userId)=>{
        try {
            const formattedData = {...data}
            formattedData.image = data.filename
            formattedData.createdBy = userId._id
            return formattedData
        } catch (exception) {
            throw exception
        }
    }
    store = async (data)=>{
        try {
            const banner = new BannerModel(data)
            return await  banner.save()
        } catch (exception) {
            throw exception
        }
    }
    getSkippedCalculated = async (query)=>{
        try {
            const page = query.page || 1
            const limit = query.limit || 10
            const skip = (page-1)*limit
            return {page,limit,skip}
        } catch (exception) {
            throw exception
        }
    }
    getSearchQuery = async (search)=>{
        try {
           
            let filter = {}
            if(search){
                filter={
                    ...filter,
                    $or:[
                    {title:new RegExp(search,"i")},
                    {status:new RegExp(search,"i")},
                    {link:new RegExp(search,"i")}
                    ]
                }
            }
            return filter
        } catch (exception) {
            throw exception
        }
    }
    totalCount = async (filter)=>{
        try {
           // $eq:{deletedAt:null} // deletedBy:{$eq:null}
            // filter = {...filter,deletedBy:{$eq:null}}
            return await BannerModel.countDocuments(filter)
        } catch (exception) {
            throw exception
        }
    } 
    getAllBanners =  async(filter,skip,limit)=>{
        try {
            // $eq:{deletedAt:null} // deletedBy:{$eq:null}
             // filter = {...filter,deletedBy:{$eq:null}}
            const banners = await BannerModel.find(filter)
                .populate("createdBy",["_id","title","status"])
                .populate("updatedBy",["_id","title","status"])
                .sort({_id:"desc"})
                .skip(skip)
                .limit(limit) 
            return banners
        } catch (exception) {
            throw exception
        }
    }
    getBannerById = async (id)=>{
        try {
            // $eq:{deletedAt:null} // deletedBy:{$eq:null}
             // filter = {...filter,deletedBy:{$eq:null}}
            const banner = await BannerModel.findById(id)
                .populate("createdBy",["_id","title","status"])
                .populate("updatedBy",["_id","title","status"])
            return banner
        } catch (exception) {
            throw exception
        }
    }
    deleteBanner = async (id)=>{
        try {
            //for sub-deletetion, run in Update query in in delete query 
    //update query ==> deletedBy : req.authUsser._id, deletedAt:Date.now()
            // $eq:{deletedAt:null} // deletedBy:{$eq:null}
             // filter = {...filter,deletedBy:{$eq:null}}
          //  const deletded = await BannerModel.deleteOne({_id:_id})
            //const deletded = await BannerModel.deleteMany({_id:_id})
            const deleted = await BannerModel.findByIdAndDelete(id)
                .populate("createdBy",["_id","title","status"])
                .populate("updatedBy",["_id","title","status"])
            if(deleted){
                return deleted
            }else{
                throw new AppError({message:" Banner does not exist or already Deleted", code:400})
            }
        } catch (exception) {
            throw exception
        }
    }
    transformUpdateBanner = async (req,oldData)=>{
        try {
            const formattedData = {...req.body}
            if(req.body.image){
                formattedData.image = req.body.image.filename
            }else {
                formattedData.image = oldData.image
            }
            formattedData.updatedBy=req.authUser._id
            return formattedData
        } catch (exception) {
            throw exception
        }
    }
    updateBanner = async(id,data)=>{
        try {
            const banner = await BannerModel.findByIdAndUpdate(id,{
                $set:data
            })
            return banner
        } catch (exception) {
            throw exception
        }
    }
    getActiveBanner = async ()=>{
        try {
            const banners = await BannerModel.find({
                status:"active",
                // startTime: {$le:Date.now()},
                // endTime : {$ge:Date.now()}
            })
            .sort({_id:"desc"})
            .limit(10)
            return banners
        } catch (exception) {
            throw exception
        }
    }
}
const bannerSvc = new BannerServices()
module.exports = bannerSvc