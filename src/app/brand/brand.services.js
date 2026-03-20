const AppError = require("../../exception/appError")
const BrandModel = require("./brand.model")
const slugify =  require("slugify")
class BrandServices{
    transformCreateBrand= (data,userId)=>{
        try {
            const formattedData = {...data}
            if(data.image){
                formattedData.image = data.image.filename
            }else{
                formattedData.image = null
            }
            if(!formattedData.showInHome || formattedData.showInHome ==""){
                formattedData.showInHome = null
            }
            formattedData.slug = slugify(formattedData.title,{
                replacement:true,
                trim:true,
                lower:true
            })
            formattedData.createdBy = userId._id
            return formattedData
        } catch (exception) {
            throw exception
        }
    }
    store = async (data)=>{
        try {
            const brand = new BrandModel(data)
            return await  brand.save()
        } catch (exception) {
            if(+exception.code ===11000){
                exception.message =  "Brand Name shuld be uinque",
                exception.code=400
            }
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
            return await BrandModel.countDocuments(filter)
        } catch (exception) {
            throw exception
        }
    } 
    getAllBrands =  async(filter,skip,limit)=>{
        try {
            // $eq:{deletedAt:null} // deletedBy:{$eq:null}
             // filter = {...filter,deletedBy:{$eq:null}}
            const brands = await BrandModel.find(filter)
                .populate("createdBy",["_id","title","status"])
                .populate("updatedBy",["_id","title","status"])
                .sort({_id:"desc"})
                .skip(skip)
                .limit(limit) 
            return brands
        } catch (exception) {
            throw exception
        }
    }
    getBrandById = async (id)=>{
        try {
            // $eq:{deletedAt:null} // deletedBy:{$eq:null}
             // filter = {...filter,deletedBy:{$eq:null}}
            const brand = await BrandModel.findById(id)
                .populate("createdBy",["_id","title","status"])
                .populate("updatedBy",["_id","title","status"])
            return brand
        } catch (exception) {
            throw exception
        }
    }
    deleteBrand = async (id)=>{
        try {
            //for sub-deletetion, run in Update query in in delete query 
    //update query ==> deletedBy : req.authUsser._id, deletedAt:Date.now()
            // $eq:{deletedAt:null} // deletedBy:{$eq:null}
             // filter = {...filter,deletedBy:{$eq:null}}
          //  const deletded = await BrandModel.deleteOne({_id:_id})
            //const deletded = await BrandModel.deleteMany({_id:_id})
            const deleted = await BrandModel.findByIdAndDelete(id)
                .populate("createdBy",["_id","title","status"])
                .populate("updatedBy",["_id","title","status"])
            if(deleted){
                return deleted
            }else{
                throw new AppError({message:" Brand does not exist or already Deleted", code:400})
            }
        } catch (exception) {
            throw exception
        }
    }
    transformUpdateBrand = async (req,oldData)=>{
        try {
            const formattedData = {...req.body}
            if(req.file){
                formattedData.image = req.file.filename
            }else {
                formattedData.image = oldData.image
            }
            formattedData.updatedBy=req.authUser._id
            return formattedData
        } catch (exception) {
            throw exception
        }
    }
    updateBrand = async(id,data)=>{
        try {
            const brand = await BrandModel.findByIdAndUpdate(id,{
                $set:data
            })
            return brand
        } catch (exception) {
            throw exception
        }
    }
    getActiveBrand = async ()=>{
        try {
            const brands = await BrandModel.find({
                status:"active",
                // startTime: {$le:Date.now()},
                // endTime : {$ge:Date.now()}
            })
            .sort({_id:"desc"})
            .limit(10)
            return brands
        } catch (exception) {
            throw exception
        }
    }
}
const brandSvc = new BrandServices()
module.exports = brandSvc