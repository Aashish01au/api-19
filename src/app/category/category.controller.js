const AppError = require("../../exception/appError")
const categorySvc = require("./category.services")

class CategoryController{
   create = async (req,res,next)=>{
        try {
            const data = await  categorySvc.transformCreateCategory(req.body, req.authUser)
            const category = await categorySvc.store(data)
            res.json({
                result:category,
                message:"Category Creatd Successfully",
                meta :null
            })
        } catch (exception) {
            console.log("CreateCategoryfunctions :",exception)
            next(exception)
        } 
    }
    index = async (req,res,next)=>{
        try {
            const {page,skip,limit} = await categorySvc.getSkippedCalculated(req.query)
            const search = req.query.search || null
            let filter = await categorySvc.getSearchQuery(search)
            const count = await categorySvc.totalCount(filter)
            const categorys = await categorySvc.getAllCategorys(filter,skip,limit)
            res.json({
                result:categorys,
                message:"Categorys Data Fetched Successfully",
                meta:{
                    total:count,
                    limit:limit,
                    page:page
                }
            })
        } catch (exception) {
            console.log("IndexCategoryfunctions :",exception)
            next(exception)
        } 
    }
    update = async (req,res,next)=>{
        try {
            const category = await categorySvc.getCategoryById(req.params.id)
            if(category){
                const data = await categorySvc.transformUpdateCategory(req,category)
                const updatedCategory = await categorySvc.updateCategory(category._id,data)
                res.json({
                    result:updatedCategory,
                    message:"category updated",
                    meta:null
                })
            }else{
                next( new AppError({message:"category doies not exitt",code:400}))
            }
        } catch (exception) {
            console.log("UpdateCategoryfunctions :",exception)
            next(exception)
        } 
    }
    detail = async (req,res,next)=>{
        try {
            const id  = req.params.id
            const category = await categorySvc.getCategoryById(id)
            if(category){
                res.json({
                    result:category,
                    message:"Category Detail",
                    meta:null
                })
            }else{
                next(new AppError({message:"Category Does not exist", code:400}))
            }
        } catch (exception) {
            console.log("DeleteCategoryfunctions :",exception)
            next(exception)
        } 
    }
    delete = async (req,res,next)=>{
        try {
            const  id = req.params.id 
            const category = await  categorySvc.deleteCategory(id)
            res.json({
                result:category,
                message:"Category Deletde Sccuessfully",
                meta :null
            })
        } catch (exception) {
            console.log("DetailCategoryfunctions :",exception)
            next(exception)
        } 
    }
   
    homeList = async (req,res,next)=>{
        try {
            const categorys =   await  categorySvc.getActiveCategory()
            res.json({
                result:categorys,
                message:"Home List",
                meta:null
            })
        } catch (exception) {
            console.log("HomeListCategoryfunctions :",exception)
            next(exception)
        } 
    }
}
const categoryCtrl = new CategoryController()
module.exports = categoryCtrl