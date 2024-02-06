const mongoose=require('mongoose')
const validator = require('validator')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter a username'],
        min:3
    },

    password:{
        type:String,
        required:[true,'Please enter a password'],
        min:6
    },

    email:{
        type:String,
        required:[true,'Please enter a email'],
        validate:{
            validator:validator.isEmail,
            message:"Please enter a correc email"
        }
    }
})

const User=mongoose.model('User',userSchema)
module.exports=User