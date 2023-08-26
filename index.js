const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/db')
const cors = require('cors')

const app = express();
connectDb()
app.use(cors())
const userRouter = require('./route/userRoute')



app.use(express.json());
app.use('/api',userRouter);




const Port = process.env.Port || 5000
app.listen(Port, ()=>{
    console.log(`app listening on ${Port} ......`);
});