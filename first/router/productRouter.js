const express= require('express')
const router=express.Router()
const Product = require ('../models/productModel')

router.route('/addProduct').post(async(req,res)=>{
    try {
        await Product.create(req.body)
        res.status(200).json({message:'Product Added',status:true})
    } catch (error) {
        res.status(500).json({message:error.message, status:false})
    }
})

router.route('/getAll').get(async(req,res)=>{
    try {
        const products=await Product.find({})
        res.status(200).json({products: products,status:true})
    } catch (error) {
        res.status(500).json({message:error.message, status:false})
    }
})

router.route('/getProduct').post(async(req,res)=>{
    try {
        const{id}=req.body
        const product= await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message, status:false})
    }
})

router.route('/updateProduct').put(async(req,res)=>{
    try {
        const{id}=req.body
        const product=await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message:'Product Not Found'})
        }
        res.status(200).json({message: `${req.body.name} Updated`})
    } catch (error) {

        res.status(500).json({message:error.message, status:false})
    }
})

router.route('/deleteProduct').delete(async(req, res) => {
    try {
        const {id}=req.body
        const product=await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:'Product Not Found'})
        }
        res.status(200).json({message:`${product.name} Deleted`})
    } catch (error) {
        res.status(500).json({message:error.message, status:false})
    }

})

module.exports=router