import dotenv from 'dotenv';
dotenv.config();
import router from "./Routes/createuser.js";
import express from 'express';
import bodyParser from "body-parser";
import connectDb from "./db/index.js";
import mongoDb from './db/db.js';

const port = process.env.PORT;

connectDb()
.then(async ()=>{
    await mongoDb();
    app.listen(port || 5000,()=>{
        console.log(`Backend Server live on port ${port} `);
    })
})

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    const origin = req.headers.origin;
    if (process.env.allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})


app.use(express.json({limit : "16kb"}));

import userRouter from './Routes/user.routes.js';
import dataRouter from './Routes/data.routes.js';

app.use("/user",userRouter);
app.use("/data",dataRouter);
