const mongoose = require('mongoose')
require("dotenv").config()


const mongoDb = async () => {
    await mongoose.connect(process.env.Key,{useNewUrlParser:true})
    .then(async ()=>{
        const itemsDb = await mongoose.connection.db.collection("foodcollection");
        itemsDb.find({}).toArray()
        .then(async (foundItems)=>{
            const foodCategory = await mongoose.connection.db.collection("foodcategory");
            foodCategory.find({}).toArray()
            .then((foundCategory)=>{
                global.food_items=foundItems;
                global.food_category=foundCategory;
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    })
    .catch((error)=>{
        console.log(error);
    })
   
}

module.exports = mongoDb;