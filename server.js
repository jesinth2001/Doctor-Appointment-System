const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser=require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes= require('./Routes/authRoutes')

dotenv.config({path:path.join(__dirname, "config.env")})

const app=express();


app.get('/',(req, res) => {
    res.send("hello world")
})
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true 
  }));

  mongoose.connect(process.env.DB_LOCAL_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{ console.log("db Connected Sucessfully")}).catch(()=>{ console.log("Error connecting")}) 

  app.listen(process.env.PORT,()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`)
})

app.use(express.json())
app.use(cookieParser())
app.use("/",authRoutes)


