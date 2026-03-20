const AppError = require("../../exception/appError")
const brandSvc = require("./brand.services")

class BrandController{
   create = async (req,res,next)=>{
        try {
            const data = await  brandSvc.transformCreateBrand(req.body, req.authUser)
            const brand = await brandSvc.store(data)
            res.json({
                result:brand,
                message:"Brand Creatd Successfully",
                meta :null
            })
        } catch (exception) {
            console.log("CreateBrandfunctions :",exception)
            next(exception)
        } 
    }
    index = async (req,res,next)=>{
        try {
            const {page,skip,limit} = await brandSvc.getSkippedCalculated(req.query)
            const search = req.query.search || null
            let filter = await brandSvc.getSearchQuery(search)
            const count = await brandSvc.totalCount(filter)
            const brands = await brandSvc.getAllBrands(filter,skip,limit)
            res.json({
                result:brands,
                message:"Brands Data Fetched Successfully",
                meta:{
                    total:count,
                    limit:limit,
                    page:page
                }
            })
        } catch (exception) {
            console.log("IndexBrandfunctions :",exception)
            next(exception)
        } 
    }
    update = async (req,res,next)=>{
        try {
            const brand = await brandSvc.getBrandById(req.params.id)
            if(brand){
                const data = await brandSvc.transformUpdateBrand(req,brand)
                const updatedBrand = await brandSvc.updateBrand(brand._id,data)
                res.json({
                    result:updatedBrand,
                    message:"brand updated",
                    meta:null
                })
            }else{
                next( new AppError({message:"brand doies not exitt",code:400}))
            }
        } catch (exception) {
            console.log("UpdateBrandfunctions :",exception)
            next(exception)
        } 
    }
    detail = async (req,res,next)=>{
        try {
            const id  = req.params.id
            const brand = await brandSvc.getBrandById(id)
            if(brand){
                res.json({
                    result:brand,
                    message:"Brand Detail",
                    meta:null
                })
            }else{
                next(new AppError({message:"Brand Does not exist", code:400}))
            }
        } catch (exception) {
            console.log("DeleteBrandfunctions :",exception)
            next(exception)
        } 
    }
    delete = async (req,res,next)=>{
        try {
            const  id = req.params.id 
            const brand = await  brandSvc.deleteBrand(id)
            res.json({
                result:brand,
                message:"Brand Deletde Sccuessfully",
                meta :null
            })
        } catch (exception) {
            console.log("DetailBrandfunctions :",exception)
            next(exception)
        } 
    }
   
    homeList = async (req,res,next)=>{
        try {
            const brands =   await  brandSvc.getActiveBrand()
            res.json({
                result:brands,
                message:"Home List",
                meta:null
            })
        } catch (exception) {
            console.log("HomeListBrandfunctions :",exception)
            next(exception)
        } 
    }
}
const brandCtrl = new BrandController()
module.exports = brandCtrl