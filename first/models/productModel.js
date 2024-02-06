const {Schema, default: mongoose}=require('mongoose')
//const {Schema, model}=require('mongoose')
//const mongoose=require('mongoose')

const productSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required : [true , 'Price is Required!'],
        min:0,
    },
    quantity:{
        type:Number,
        required:[true,'Quantity is Required'],
        min:0,
    },
    
    image:{
        type:String,
    }

})

const Product = mongoose.model('Product',productSchema)
//const Product = model('Product',productSchema)
//const Product = mongoose.model('Product',productSchema)
module.exports=Product 