import mongoose from 'mongoose';

const mongoDb = async () => {
    await mongoose.connect(process.env.KEY,{useNewUrlParser:true})
    .then(async ()=>{
        const itemsDb = mongoose.connection.db.collection("foodcollection");
        itemsDb.find({}).toArray()
        .then(async (foundItems)=>{
            const foodCategory = mongoose.connection.db.collection("foodcategory");
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

export default mongoDb;