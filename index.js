const router = require("./Routes/createuser")
require("dotenv").config()
const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
mongoose.connect(process.env.Key,{useNewUrlParser:true})
.then(()=>{
    console.log("connected with mongodb");
})
.catch((err)=>{
    console.log(err);
})

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","https://easyfood-yotx.onrender.com","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})


app.use(express.json())

app.use("/",router);


app.get("/",(req,res)=>{
    res.send("HI");
})

app.listen(5000,(req,res)=>{
    console.log("Backend Server live on port 5000 yes");
})