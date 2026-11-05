import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectDB from './utils/db.js'
import userRoute from './routes/userRoute.js'
import jobRoute from './routes/jobRoute.js'
import companyRoute from './routes/companyRoute.js'
import applicationRoute from './routes/applicationRoute.js'

const app = express();
const PORT = 3000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1/user', userRoute)
app.use('/api/v1/job', jobRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/application', applicationRoute)

app.get('/',(req, res)=>{
    res.send("Hello world!")
})

connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
    
})