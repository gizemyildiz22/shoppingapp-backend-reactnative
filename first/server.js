//console.log('Hello Node.js')
//REQUIRE
const express = require("express")
const mongoose= require('mongoose')
const cors=require('cors')

const app =express()

//CORS
app.use(cors())

//MODELS
const Product = require('./models/productModel')
const Category = require('./models/categoryModel')

//ROUTER
const CategoryRouter=require('./router/categoryRouter')
const ProductRouter=require('./router/productRouter')
const UserRouter=require('./router/userRouter')

//ENV
require('dotenv').config()

//MIDDLEWARE
const authMiddleware=require('./middleware/auth')

//MONGODB CONNECTION
mongoose.connect('mongodb+srv://gizemyildiz:gizemyildiz@wissen11.cmbs9es.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('MongoDb Connected!')
}).catch(error => console.log(error))


app.use(express.json())

app.get('/',(req,res)=>{
 console.log('Node Server Worked!')
 res.send('Node Server Worked!')
})

//ROUTER
app.use('/category',CategoryRouter)
app.use('/product',ProductRouter)
app.use('/auth',UserRouter)

//MIDDLEWARE
app.use(authMiddleware)

app.listen('9000')

