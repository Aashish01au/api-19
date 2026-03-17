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
    totalCount = async (filter)=>{
        try {
            return await BannerModel.countDocuments(filter)
        } catch (exception) {
            throw exception
        }
    } 
    getAllBanners =  async(filter,skip,limit)=>{
        try {
            const banners = await BannerModel.find(filter)
                .populate("createdBy",["_id","title","status"])
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
            const banner = await BannerModel.findById(id)
            return banner
        } catch (exception) {
            throw exception
        }
    }
    deleteBanner = async (id)=>{
        try {
          //  $eq:[{"deletedAt":null}]
          //  const deletded = await BannerModel.deleteOne({_id:_id})
            //const deletded = await BannerModel.deleteMany({_id:_id})
            const deleted = await BannerModel.findByIdAndDelete(id)
            if(deleted){
                return deleted
            }else{
                throw new AppError({message:" Banner does not exist or already Deleted", code:400})
            }
        } catch (exception) {
            throw exception
        }
    }
}
const bannerSvc = new BannerServices()
module.exports = bannerSvc