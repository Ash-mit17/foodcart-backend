import Order from "../models/orders.js";
import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { body, validationResult } from 'express-validator';
const jwtSecret="earthholymothernaturesciencegrat"

import User from "../models/user.js";

router.post("/createuser",
    [body('email').isEmail(), body('name').isLength({min:5}),body('password','Invalid Password').isLength({ min: 5 })]
    ,async (req, res) => {
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const salt = await bcrypt.genSalt(10);
        const securepass = await bcrypt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                password: securepass,
                location: req.body.location,
                email: req.body.email
            })
            res.json({ success: true })
        }
        catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

    router.post("/login",[body('email').isEmail(),body('password','Invalid Password').isLength({ min: 5 })]
    ,async (req, res) => {
        
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        let email=req.body.email;
        try{
           let validuser = await User.findOne({email:email});
           
           if(!validuser){
            return res.status(400).json({errors:"Try with a valid credentials email not found"})
           }
           //    console.log(req.body.password,validuser.password)
           const comparepass=await bcrypt.compare(req.body.password,validuser.password);
           if(!comparepass){
            return res.status(400).json({errors:"Try with a Valid credentials"})
           }
           const data={
            user:{
                id:validuser._id
            }
           }
           const authToken= jwt.sign(data,jwtSecret)
           return res.json({success:true,authToken:authToken})
        }

        catch (error){
            res.json({success:false})
        }
        
    })

router.get("/fooddata",async (req,res)=>{
    try {
        var data=[];
        data.push(global.food_items);
        data.push(global.food_category)
        // res.write();
        res.send(data);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
})

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ email: req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});



export default router;