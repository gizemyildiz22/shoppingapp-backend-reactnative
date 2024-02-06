const express=require('express')
const userRouter=express.Router()
const User=require('../models/userModel')
const jwt = require('jsonwebtoken')
const tokenControl = require('../middleware/auth')

userRouter.route('/register').post(async(req,res) => { 
    try {
        const {name,password,email}=req.body
        const emailExist=await User.findOne({email})
        if(emailExist){
            return res.status(404).json({message:'This email is already exist'})
        }
        const user=await User.create({name,password,email})
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

userRouter.route('/login').post(async(req,res)=>{
    try {
        const{password,email}=req.body
        const userFromDB= await User.findOne({email})
        if(!userFromDB){
            return res.status(404).json({message:'User not Found!'})
        }
        if(userFromDB.password !==password ){
            return res.status(404).json({message:'Incorrect password'})
        }

        let {_id,name}= userFromDB
        //CREATE JWT TOKEN
        //let privateKey="Wissen11**Gizem" //Konu anlatım amaçlıdır, daha uzun ve karışık olması önemlidir.
        let token = jwt.sign({_id,name,email},process.env.JWT_SECRET_KEY, {expiresIn:'1h'})

        res.status(200).json(
            {
                message:'Welcome',
                token:token
            })           
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

userRouter.route('/getAll').get(tokenControl, async(req,res)=>{
    try { 
        const users =await User.find({})
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

module.exports=userRouter