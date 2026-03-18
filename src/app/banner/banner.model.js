const mongoose = require("mongoose")
const BannerSchema = new mongoose.Schema({
    title:{
        type:String,
        min:3,
        require:true
    },
    image:{
        type:String,
        min:3,
        require:true
    },
    link:{
        type:String,
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

const BannerModel = mongoose.model("Banner",BannerSchema)
module.exports = BannerModel