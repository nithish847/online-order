import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import connectDb from "./utils/db.js";
dotenv.config({})
import userRoutes from "./routes/user.routes.js";
import productRoutes from './routes/product.route.js'
import orderRoutes from './routes/order.route.js'
import contactRoutes from "./routes/contact.route.js"
const PORT=process.env.PORT || 5000

const app=express()


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))


//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1",productRoutes)
app.use("/api/v1/orders", orderRoutes);
app.use('/api/v1/contact', contactRoutes);
app.listen(PORT,()=>{
    connectDb()
    console.log(`Server running at port ${PORT}`)
})