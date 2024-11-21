import jwt from "jsonwebtoken";
import { errorHandler } from "../Utils/ErrorHandler.js";
import { unknownErrorHandler } from "../Utils/UnknownErrorHandler.js"
import { doctorModel } from "../Models/doctorModel.js";

export const doctorAuthentication = async(req , res , next) =>{ 

      try {

         const {doctorToken} = req.cookies;

         if (!doctorToken){
             return errorHandler(res , 402 ,  "UnAuthorised Doctor Access Denied")
         }

         const decodedDoctor = jwt.verify(doctorToken , process.env.JWT_DOCTOR_SECRET)

         req.authDoctor = await doctorModel.findOne({
             doctorEmail : decodedDoctor.doctorEmail
         })

         console.log(req.authDoctor)

         next();

      }
      catch (error) {
         
         return unknownErrorHandler(res , error.message)

      }

}