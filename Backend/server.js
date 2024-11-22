import express from "express";
import "dotenv/config"
import cors from 'cors'
import cookieParser from "cookie-parser"
import { connectDB } from "./Configuration/connectDB.js";
import adminRouter from './api/adminRoutes.js'
import doctorRouter from './api/doctorRouter.js'
import userRouter from './api/userRouter.js'
import appointmentRouter from './api/AppointmentRoutes.js'
const app = express()

// Connecting the Database :-
connectDB()

//  Middlewares :-
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
     origin : ["http://localhost:5173" , "http://localhost:5174"],
     credentials : true
}))
app.use(cookieParser())


//  Routes for EndPoint :-
app.use("/api/v1/admin" , adminRouter)
app.use("/api/v1/doctor" , doctorRouter)
app.use("/api/v1/user" , userRouter)
app.use("/api/v1/appointment" , appointmentRouter)


app.get("/" , function(req , res) {
     return res.send("Api Working")
})



//  Running the Server on the PORT :-
app.listen(process.env.PORT , () =>{
     console.log(`Server is running on the PORT : ${process.env.PORT}`)
})