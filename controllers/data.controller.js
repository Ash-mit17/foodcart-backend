import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResonse from "../utils/ApiResponse.js";
import Order from "../models/orders.js";

const orderData = asyncHandler(async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    

    if (eId===null) {
        await Order.create({
            email: req.body.email,
            order_data:[data]
        })

        return res.status(201).json(new ApiResonse(201, "success"));
    }

    else {
        await Order.findOneAndUpdate({email:req.body.email},
            { $push:{order_data: data} })
            
        return res.status(201).json(new ApiResonse(201, "success"));
    }
});

const foodData = asyncHandler(async (req, res) => {
    var data=[];
    data.push(global.food_items);
    data.push(global.food_category)
    res.status(201).json(new ApiResonse(201, "success", data));
})

const myOrderData = asyncHandler(async (req, res) => {
    let eId = await Order.findOne({ email: req.body.email })
    res.status(201).json(new ApiResonse(201, "success", {orderData:eId}));
})

export { foodData, orderData, myOrderData };