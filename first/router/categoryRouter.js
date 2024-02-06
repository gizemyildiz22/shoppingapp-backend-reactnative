const express=require('express')
const Category = require('../models/categoryModel')
const router= express.Router()

router.route('/').get(async(req,res)=>{
    res.send('Here is Categories')
})

router.route('/addCategory').post(async(req,res)=>{
    try {
        await Category.create(req.body)
        res.status(200).json({message:'Category Added',status:true})
    } catch (error) {
        res.status(500).json({message:error.message, status:false})
    }
})

router.route('/getAll').get(async(req,res)=>{
    try {
        const categories=await Category.find({})
        res.status(200).json({categories: categories,status:true})
    } catch (error) {
        res.status(500).json({message:error.message, status:false})
    }
})

router.route('/getCategory').post(async(req,res)=>{
    try {
        const{id}=req.body
        const category= await Category.findById(id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message:error.message, status:false})
    }
})

router.route('/updateCategory').put(async(req,res)=>{
    try {
        const{id}=req.body
        const category=await Category.findByIdAndUpdate(id,req.body)
        if(!category){
            return res.status(404).json({message:'Category Not Found'})
        }
        res.status(200).json({message: `${req.body.name} Updated`})
    } catch (error) {

        res.status(500).json({message:error.message, status:false})
    }
})

router.route('/deleteCategory').delete(async(req, res) => {
    try {
        const {id}=req.body
        const category=await Category.findByIdAndDelete(id)
        if(!category){
            return res.status(404).json({message:'Category Not Found'})
        }
        res.status(200).json({message:`${category.name} Deleted`})
    } catch (error) {
        res.status(500).json({message:error.message, status:false})
    }

})

module.exports=router