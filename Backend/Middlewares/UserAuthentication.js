//  User Authentication :-

import jwt from "jsonwebtoken";
import { errorHandler } from "../Utils/ErrorHandler.js";
import { unknownErrorHandler } from "../Utils/UnknownErrorHandler.js"
import { userModel } from "../Models/userModel.js";

export const userAuthentication = async(req , res , next) =>{
     
    try {

        const {authToken} = req.cookies;
        console.log(authToken)
        if (!authToken) {
            
             return errorHandler(res , 402 , "User UnAuthorisation Access Denied")

        }

        const decodedData = jwt.verify(authToken , process.env.JWT_USER_SECRET)

        req.user = await userModel.findById(decodedData.userId)
       
        
        next()

    }
    catch (error) {
        return unknownErrorHandler(res , error.message)
    }
}