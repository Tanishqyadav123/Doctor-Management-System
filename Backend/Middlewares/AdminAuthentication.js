import jwt from "jsonwebtoken";
import { errorHandler } from "../Utils/ErrorHandler.js";
import { unknownErrorHandler } from "../Utils/UnknownErrorHandler.js";

export const adminAuthentication = (req , res , next) =>{

   try{
    const {adminAuthToken} = req.cookies;

    if (!adminAuthToken) {
       return errorHandler(res , 402 , "UnAuthorised Access Denied" )
    }

    const decodedUser = jwt.verify(adminAuthToken , process.env.JWT_ADMIN_SECRET)
    if (decodedUser.adminEmail && decodedUser.adminPassword) {
         next();
    }


   }
   catch (error) {
     return unknownErrorHandler(res , error.message)
   }

}