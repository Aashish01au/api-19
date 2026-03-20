const AppError = require("../../exception/appError")
const CategoryModel = require("./category.model")
const slugify =  require("slugify")
class CategoryServices{
    transformCreateCategory= (data,userId)=>{
        try {
            const formattedData = {...data}
            if(data.image){
                formattedData.image = data.image.filename
            }else{
                formattedData.image = null
            }
           if(!data.parentId || data.parentId ==="null" ){
            formattedData.parentId = null
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
            const category = new CategoryModel(data)
            return await  category.save()
        } catch (exception) {
            if(+exception.code ===11000){
                exception.message =  "Category Name shuld be uinque",
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
            return await CategoryModel.countDocuments(filter)
        } catch (exception) {
            throw exception
        }
    } 
    getAllCategorys =  async(filter,skip,limit)=>{
        try {
            // $eq:{deletedAt:null} // deletedBy:{$eq:null}
             // filter = {...filter,deletedBy:{$eq:null}}
            const categorys = await CategoryModel.find(filter)
                .populate("createdBy",["_id","title","status"])
                .populate("updatedBy",["_id","title","status"])
                .populate("parentId",["_id","title","status"])
                .sort({_id:"desc"})
                .skip(skip)
                .limit(limit) 
            return categorys
        } catch (exception) {
            throw exception
        }
    }
    getCategoryById = async (id)=>{
        try {
            // $eq:{deletedAt:null} // deletedBy:{$eq:null}
             // filter = {...filter,deletedBy:{$eq:null}}
            const category = await CategoryModel.findById(id)
                .populate("createdBy",["_id","title","status"])
                .populate("updatedBy",["_id","title","status"])
                .populate("parentId",["_id","title","status"])
            return category
        } catch (exception) {
            throw exception
        }
    }
    deleteCategory = async (id)=>{
        try {
            //for sub-deletetion, run in Update query in in delete query 
    //update query ==> deletedBy : req.authUsser._id, deletedAt:Date.now()
            // $eq:{deletedAt:null} // deletedBy:{$eq:null}
             // filter = {...filter,deletedBy:{$eq:null}}
          //  const deletded = await CategoryModel.deleteOne({_id:_id})
            //const deletded = await CategoryModel.deleteMany({_id:_id})
            const deleted = await CategoryModel.findByIdAndDelete(id)
                .populate("createdBy",["_id","title","status"])
                .populate("updatedBy",["_id","title","status"])
                .populate("parentId",["_id","title","status"])

            if(deleted){
                return deleted
            }else{
                throw new AppError({message:" Category does not exist or already Deleted", code:400})
            }
        } catch (exception) {
            throw exception
        }
    }
    transformUpdateCategory = async (req,oldData)=>{
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
    updateCategory = async(id,data)=>{
        try {
            const category = await CategoryModel.findByIdAndUpdate(id,{
                $set:data
            })
            return category
        } catch (exception) {
            throw exception
        }
    }
    getActiveCategory = async ()=>{
        try {
            const categorys = await CategoryModel.find({
                status:"active",
                // startTime: {$le:Date.now()},
                // endTime : {$ge:Date.now()}
            })
            .sort({_id:"desc"})
            .limit(10)
            return categorys
        } catch (exception) {
            throw exception
        }
    }
}
const categorySvc = new CategoryServices()
module.exports = categorySvc