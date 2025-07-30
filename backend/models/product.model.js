import  mongoose from 'mongoose'


const productSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
image:{
     type:String,
     default:""
},
description:{
    type:String,
    default:""
},createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true    
  }
},{timestamps:true})

export const Product=mongoose.model("Product",productSchema)