// Adding new Doctor

import { uploadToCloudinary } from "../Configuration/cloudinary.js";
import { appointmentModel } from "../Models/AppointmentModel.js";
import { doctorModel } from "../Models/doctorModel.js";
import { userModel } from "../Models/userModel.js";
import { errorHandler } from "../Utils/ErrorHandler.js";
import { responseHandler } from "../Utils/ResponseHandler.js";
import { unknownErrorHandler } from "../Utils/UnknownErrorHandler.js";
import jwt from 'jsonwebtoken'

export const addNewDoctor = async (req, res) => {
  try {
    const {
      doctorName,
      doctorEmail,
      doctorPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      dob,
      gender
    } = req.body;

    if (
      !doctorName ||
      !doctorEmail ||
      !doctorPassword ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !dob ||
      !gender 

    ) {
      return errorHandler(res, 400, "Please Provide all the details");
    }

    const imagePath = req.file?.path;
    console.log(imagePath);
    if (!imagePath) {
      return errorHandler(
        res,
        400,
        "Please Provide the doctorImage in the form"
      );
    }

   

    //     Check if doctor with email already exist :-
    const isExist = await doctorModel.findOne({
      doctorEmail: doctorEmail,
    });

    if (isExist) {
      return errorHandler(
        res,
        400,
        "Doctor Already exist with this email Address"
      );
    }

    //  Upload Doctor Image on Cloudinary :-
    const response = await uploadToCloudinary(imagePath)

    if (!response.public_id) {
         return errorHandler(res , 500 , "Could not upload to cloudinary")
    }

    const newDoctor = await doctorModel.create({
      doctorName,
      doctorEmail,
      doctorPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      dob : Date.now(dob),
      gender,
      doctorImage : response.secure_url,
      doctorImage_publicId : response.public_id,
    });

    if (!newDoctor) {
         return errorHandler(res , 400 , "Could not add new Doctor")
    }

    return responseHandler(res , 201 , "New Doctor Added SuccessFully" , newDoctor)

  } 
  catch (error) {
    return unknownErrorHandler(res, error.message);
  }
};



//  Loggin Admin :-
export const loginAdmin = async (req , res) =>{
    
    try {
         const {adminEmail , adminPassword} = req.body;
         if (!adminEmail || !adminPassword  ) {
            return errorHandler(res, 400, "Please Provide all the details");
          }

          if (adminEmail != process.env.ADMIN_EMAIL || adminPassword != process.env.ADMIN_PASSWORD) {
             return errorHandler(res , 401 , "Invalid Credentails")
          }

        //   Generate the JWT_ Token :-
        const token = jwt.sign({adminEmail , adminPassword} , process.env.JWT_ADMIN_SECRET)

        if (!token) {
             return errorHandler(res , 400 , "Jwt Token could not be generated")
        }

        res.cookie("adminAuthToken" , token , {
            httpOnly : true,
            secure : true
        })
        return responseHandler(res , 200 , "Admin LoggedIn SuccessFully" , {adminAuthToken : token})
        



    }
    catch (error) {
        return unknownErrorHandler(res, error.message);
    }

}


//  Getting all the doctors from DB :-
export const getAllDoctors = async(req , res) =>{
  
   try {
    
       const allDoctors =  (await doctorModel.find({}).select("-doctorPassword")).reverse()
       if (!allDoctors) {
         return errorHandler(res , "400" , "Could not get the doctor Details")
       }

       return responseHandler(res , 200 , "All Doctors " , allDoctors)

   } catch (error) {
    
       return unknownErrorHandler(res , error.message)

   }

}


//  Managing doctor availability :-
export const manageDoctorAvailability = async(req , res) =>{
  
    try {
       
      const {docId} = req.params;

      if (!docId) {
         return errorHandler(res , 400 , "doctor Id is not provided")
      }

      const doctorDetails = await doctorModel.findById(docId)
      const updatedDoctor = await doctorModel.findByIdAndUpdate(docId , {available : !doctorDetails.available} , {new : true})
      if (updatedDoctor) {
         
        const allDoctors = await doctorModel.find()
        return responseHandler(res , 200 , "Doctor Availability Updated SuccesFully" , allDoctors.reverse())
      }
      

    }
    catch(error) {
      
        return unknownErrorHandler(res , error.message)

    }

}


//  Fetching all the Appointment List :-
export const getAllAppointments = async(req , res) =>{
 
    try {
       const allAppointments = await appointmentModel.find()
  
       if (!allAppointments) {
           return errorHandler(res , 400 , "Appointments data not found")
       }
  
       return responseHandler(res , 200 , "All Appointments List" , allAppointments)
    } catch (error) {
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



//  API for getting the data for admin Dashboard :-
export const getAdminDashboardData = async(req , res) =>{
  
    try {
      
        //  Getting all doctors count , all Patient count , all appointments counts , recent 5 appointments count :-
        const allDoctors = await doctorModel.find()
        
        const allPatient = await userModel.find()

        const allAppointments = await appointmentModel.find()

        return responseHandler(res , 200 , "All Data for admin Dashboard" , {allDoctorsCount : allDoctors.length , allPatientCount : allPatient.length , allAppointmentsCount : allAppointments.length , recentAppointments : allAppointments.reverse().splice(0 , 5)})

    }
    catch (error) {
      
       return unknownErrorHandler(res , error.message)

    }

}