import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from "./routes/userRoute.js";
import CompanyRoute from "./routes/companyRoute.js"
import JobRoute from "./routes/jobRoute.js";
import ApplicationRoute from "./routes/applicationRoute.js"
dotenv.config({});

import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions ={
    origin :'http//localhost:5173',
    Credentials:true
}
app.use(cors(corsOptions))

// api's
app.use('/api/v1/user',userRoute);
// "http://localhost:5000/api/v1/user/register"
// "http://localhost:5000/api/v1/user/login"
// "http://localhost:5000/api/v1/user/profile/update"
app.use('/api/v1/company',CompanyRoute);
app.use('/api/v1/job', JobRoute);
app.use('/api/v1/application', ApplicationRoute);


app.get('/',(req, res)=>{
    res.send("Hello world!")
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`);
    
})