import { errorHandler } from "../Utils/ErrorHandler.js";
import { responseHandler } from "../Utils/ResponseHandler.js";
import { unknownErrorHandler } from "../Utils/UnknownErrorHandler.js"
import {userModel} from '../Models/userModel.js'
import jwt from "jsonwebtoken";
import { deleteFromCloudinary, uploadToCloudinary } from "../Configuration/cloudinary.js";
import { appointmentModel } from "../Models/AppointmentModel.js";
import { doctorModel } from "../Models/doctorModel.js";
import razorpay from 'razorpay'


//  Register User :-
export const registerUser = async(req , res) =>{
    
    try {

        const {username , email , password} = req.body;

        if (!username || !email || !password) {
             return errorHandler(res , 400 , "Please Provide all the details")
        }
         
        const userDetails = await userModel.findOne({
             email : email
        })

        if (userDetails){
             return errorHandler(res , 400 , "User Already exist")
        }

        //  Create User :-
        const createNewUser = await userModel.create({
             username,
             email,
             password
        })

        if (!createNewUser) {
             return errorHandler(res , 400 , "New User Created SuccessFully")
        }

        return responseHandler(res , 201 , "User Created SuccessFully" , createNewUser)



        
    }
    catch (error) {
        
        return unknownErrorHandler(res , error.message)

    }

}

//  Login User :-
export const loginUser = async (req , res) => {
    
    try {
    
        const {email , password} = req.body;

        if (!email || !password) {
            return errorHandler(res , 400 , "Please Provide all the details")
        }

        const userDetails = await userModel.findOne({
             email : email
        })

        if (!userDetails) {
             return errorHandler(res , 400 , "User Does not exist...Please Register First")
        }

        //  Check The Password :-
        const isMatch = await userDetails.ComparePassword(password);

        if (!isMatch) {
            return errorHandler(res , 401 , "Invalid Credentails...") 
        }

        //  Now Generate the authToken :-
        const token = jwt.sign({userId : userDetails._id , email : userDetails.email} , process.env.JWT_USER_SECRET)

        if (!token) {
             return errorHandler(res , 400 , "Auth Token Can not be generated")
        }

        res.cookie("authToken" , token , {
             httpOnly : true,
             secure : true,
             maxAge : 15*24*60*60*1000
        })

        return responseHandler(res , 200 , "User Logged In SuccessFully" , userDetails)
        
    } 
    catch (error) {
        
        return unknownErrorHandler(res , error.message)

    }

}

// Logout User :-
export const logoutUser = async (req , res) =>{
    
      try {
         console.log("In logout")
         const authUser = req.user;
         console.log(authUser)
         if (authUser) {
            
             res.clearCookie("authToken")

             return responseHandler(res , 200 , "user logout successfully" , authUser)

         }

      } catch (error) {
          console.log(error)
      }

}

//  Get User Profile :-
export const getMyProfile = async (req , res) =>{
    
    try {
  
        const authUser = req.user;

        if (!authUser) {
             return errorHandler(res , 402 , "UnAuthorised Access Denied")
        }

        return responseHandler(res , 200 , "Logged In User : " , authUser)
        
    }
   catch (error) {
        return unknownErrorHandler(res , error.message)
    }

}


// Update User Profile :-
export const updateUserDetails = async (req , res) =>{
 
    try {
        
        const authUser = req.user;
        const {username , phone , gender , address , dob} = req.body;

        const imagePath = req.file?.path

        //  Firstly if there is imagePath Present , So upload the image to cloudinary first :-
        let updatedObj = {...req.body}
        if (imagePath) {
            
            if (authUser?.userImage_PublicId) {
                //  Remove the image from cloudinary :-
                const resultOfRemoval = await deleteFromCloudinary(authUser?.userImage_PublicId)

                console.log(resultOfRemoval)

            }

              //  Now Upload To Cloudinary :-
              const responseOfUploadation = await uploadToCloudinary(imagePath)

              if (!responseOfUploadation.public_id) {
                   return errorHandler(res , 400 , "Image Could not upload to cloudinary")
              }

              updatedObj = {...updatedObj , userImage : responseOfUploadation.secure_url , userImage_PublicId : responseOfUploadation.public_id}
              console.log(updatedObj)

        }

        //  Now Update the data :-
        const updatedUser = await userModel.findByIdAndUpdate(authUser?._id , {...updatedObj} , {new : true})

        if (!updatedUser) {
             return errorHandler(res , 400 , "User could not get updated...")
        }

        return responseHandler(res , 200 , "User Details Updated SuccessFully" , updatedUser)
        
     }

    catch(error) {
        
        return unknownErrorHandler(res , error.message)

    }
    
}


// Cancel Appointment :-
export const cancelAppointmentById = async(req ,  res) =>{
    
   try {
    
      const {appointmentId} = req.params;

      if (!appointmentId) {
          
          return errorHandler(res , 404 , "Please Provide the appointmentId")

      }

      const appointmentToCancel = await appointmentModel.findById(appointmentId)

      if (!appointmentToCancel) {
         return errorHandler(res , 404 , "Appointment for particular Id not found")
      }

    //    Find The Doctor Details first :-

    const doctorDetails = await doctorModel.findById(appointmentToCancel.docData._id)

    if (!doctorDetails) {
        return errorHandler(res , 404 , "Doctor for appointment not found")
    }

    console.log(doctorDetails)
    console.log(appointmentToCancel)

    //  Free the cancelled Slot from doctorDetails :-
      
      const allSlots = doctorDetails.slots_booked;

      if (allSlots[appointmentToCancel.slotDate] && allSlots[appointmentToCancel.slotDate].length == 1){
        
        //   Only One Slot is present for that Date :-
        delete allSlots[appointmentToCancel.slotDate]
         
        const updatedDoctorDetails = await doctorModel.findByIdAndUpdate(doctorDetails._id , {...doctorDetails , slots_booked : allSlots} , {new : true})

        console.log(updatedDoctorDetails)
        
      }
      else {
        
        //  More than one Slot is present for that Date :-
        let updatedTimeSlots = allSlots[appointmentToCancel.slotDate].filter((timeSlot , index) =>{
            
              if (timeSlot != appointmentToCancel.slotTime) {
                 return timeSlot
              }

        })
        allSlots[appointmentToCancel.slotDate] = updatedTimeSlots
        console.log(allSlots)

        const updatedDoctorDetails = await doctorModel.findByIdAndUpdate(doctorDetails._id , {...doctorDetails , slots_booked : allSlots} , {new : true})

        console.log(updatedDoctorDetails)


      }

      const deletedAppointment = await appointmentModel.findByIdAndDelete(appointmentId , {new : true})

      if (!deletedAppointment) {
         return errorHandler(res , 400 , "Could not cancel your Appointment")
      }

      return responseHandler(res , 200 , "Appointment Cancelled SuccessFully" , deletedAppointment)

   }
    catch (error) {

         return unknownErrorHandler(res , error.message)

    }

}


// Creating an Instance for razorPay Payment gateway :-

const razorPayInstance = new razorpay({
     key_id : process.env.RAZORPAY_KEY_ID,
     key_secret : process.env.RAZORPAT_KEY_SECRET
})

//  Pay Online Using RazorPay :-
export const paymentThroughRazorPay = async (req , res) =>{
    
     try {
        
        const {appointmentId} = req.body;

        if (!appointmentId)  {
             return errorHandler(res , 404 , "Please Provide The AppointmentId")
        }

        // Find the Appointment Using its Id :-
        const appointmentDetails = await appointmentModel.findById(appointmentId)

        if (!appointmentDetails) {
             return errorHandler(res , 404 , "Appointment not found")
        }

        //  Creating an options for creating an order of razorPay :-
        const options = {
             amount : appointmentDetails.amount,
             currency : process.env.CURRENCY,
             receipt : appointmentId
        }

        const order = await razorPayInstance.orders.create(options)

        return res.json({
             success : true,
             order : order
        })
     }
     catch (error) {
        
         return unknownErrorHandler(res , error.message)

     }

}

// Verify Payment :-
export const verifyRazorPayment = async (req , res) =>{
    
     try {

         const {razorpay_order_id} = req.body;
         const authUser = req.user

        //   Find the order Details using razorpay_order_id :-
        const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status) {
            //  Mark the isPaid field in appointment as true :-
            const updatedAppointmentDetails = await appointmentModel.findByIdAndUpdate(orderInfo.receipt , {isPaid : true} , {new : true})

            if (!updatedAppointmentDetails) {
                 return errorHandler(res , 400 , "Payment is done could not be updated")
            }

            const getAllMyAppointment = await appointmentModel.find({
                userId : authUser._id
            })

            return responseHandler(res , 200 , "Payment Completed Online" , getAllMyAppointment.reverse())
        }

        else {
             return errorHandler(res , 400 , "Payment Failed")
        }

     }
     catch (error) {
        
        return unknownErrorHandler(res , error.message)

     }

}