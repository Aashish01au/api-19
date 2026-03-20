const mongoose = require("mongoose")
const CategorySchema = new mongoose.Schema({
    title:{
        type:String,
        min:2,
        require:true
    },
    image:{
        type:String,
        require:false
    },
    parentId:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
    },
    slug:{
        type:String,
        unique:true,
        require:true
    },
    showInHome:{
        type:Boolean,
        require:true
    },
    showInMenu:{
        type:Boolean,
        require:true
    },
    status:{
        type:String,
       enum:["active","inactive"],
       default:"inactive",
        require:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null,
        require:true
    },
    updatedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null,
        require:true
    },
    // deletedBy:{
    //     type:mongoose.Types.ObjectId,
    //     ref:"User",
    //     require:true
    // },
    // deletedAt:{
    //     type:String,
    //     require:true
    // }
    // startTime:{
    //         type:String,
    //         require:true
    //     },
    // endTime:{
    //         type:String,
    //         require:true
    //     }
    
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})

const CategoryModel = mongoose.model("Category",CategorySchema)
module.exports = CategoryModel