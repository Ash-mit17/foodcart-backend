import mongoose from 'mongoose';

const connectDb = async ()=>{
    try{
        const connectInstance = await mongoose.connect(process.env.KEY);
        console.log(`Database connected successfully on port ${connectInstance.connection.port}`);
    }
    catch(error){
        console.log("Database connection failed\n");
        console.log(error);
    }
}

export default connectDb;