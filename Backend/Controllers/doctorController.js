import jwt from "jsonwebtoken";
import { doctorModel } from "../Models/doctorModel.js"
import { errorHandler } from "../Utils/ErrorHandler.js";
import { responseHandler } from "../Utils/ResponseHandler.js";
import { unknownErrorHandler } from "../Utils/UnknownErrorHandler.js"
import { appointmentModel } from "../Models/AppointmentModel.js";

export const getAllDoctorsList = async (req , res) =>{
    
    try {
        
        const allDoctors = await doctorModel.find();

        if (!allDoctors){
             return errorHandler(res , 400 , "Doctors could not be fetched" )
        }

        return responseHandler(res , 200 , "All Doctors List" , allDoctors)

    }
    catch (error) {
        
       return unknownErrorHandler(res , error.message) 
        
    }

}


//  Get Doctor Details by Id :-
export const getSingleDoctorById = async(req , res) =>{
    
    try {
         const {doctorId} = req.params;

         if (!doctorId) {
            
            return errorHandler(res , 400 , "Please Provide the doctor Id")

         }

         const doctorDetails = await doctorModel.findById(doctorId).select("-doctorPassword")

         if (!doctorDetails) {
            return errorHandler(res , 400 , "Doctor could not find with This Id")
         }

         return responseHandler(res , 200 , "Doctor Details : ", doctorDetails)
    }
    catch (error) {
         return unknownErrorHandler(res , error.message)
    }

}


// Fetch all the relatedDoctor :- 
export const fetchRelatedDoctors = async (req , res) =>{
     try {
        
        const {doctorId} = req.params;

        if (!doctorId) {
            
            return errorHandler(res , 400 , "Please Provide the doctor Id")

         }

        //  Step - 1 :- find the doctor by Id :-
        
        const doctorDetails = await doctorModel.findById(doctorId).select("-doctorPassword")

        if (!doctorDetails) {
            return errorHandler(res , 400 , "Doctor could not find with This Id")
         }

        // Step - 2 :- Find all the other doctors related to that doctor :-
        let relatedDoctor = await doctorModel.find({
            speciality : doctorDetails.speciality
        })
       relatedDoctor = relatedDoctor.filter(x => x._id.toString() != doctorId.toString())

        return responseHandler(res , 200 , "All The Related Doctor " , relatedDoctor)
 
     }
     catch (error) {
         return unknownErrorHandler(res , error.message)
     }
}

//  Login Doctor :-

export const loginDoctor = async (req , res) =>{
    
     try {
        
         const {doctorEmail , doctorPassword} = req.body;

         if (!doctorEmail || !doctorPassword){
             return errorHandler(res , 400 , "Please Provide the details")
         }

        //   Check if the doctor exist in the DB :-
        const doctorExist = await doctorModel.findOne({
             doctorEmail
        })
        
        if (!doctorExist) {
             return errorHandler(res , 404 , "Doctor Not found...Contact Admin" )
        }

        // Check The Password validation:-
         const isMatch = await doctorExist.comparePassword (doctorPassword)

         if (!isMatch) {
            
             return errorHandler(res , 401 , "Invalid Credentails")

         }

         const token = jwt.sign({doctorName : doctorExist.doctorName , doctorEmail : doctorEmail} , process.env.JWT_DOCTOR_SECRET)

         res.cookie("doctorToken" ,token , {
              secure : true,
              httpOnly : true
         })

         return responseHandler(res , 200 , "Doctor Login SuccessFully" , {doctorExist , doctorToken : token})

     }
     catch (error){
         return unknownErrorHandler(res , error.message)
     }

}


// Get all the loggedIn Doctor's Appointment :-
export const getLoggedInDoctorAppointment = async(req , res) => {
    
     try {
         
         const authDoctor = req.authDoctor;
         const allMyAppointments = await appointmentModel.find({
              docId : authDoctor._id
         })

         if (!allMyAppointments) {
             return errorHandler(res , 400 , "Appointments for auth Doctor not found")
         }

         return responseHandler(res , 200 , "Your All Appointments" , allMyAppointments)
     }
     catch (error) { 
         return unknownErrorHandler(res , error.message)
     }

}

//  Get Dashboard data :-

export const getDoctorDashboardData = async(req , res) =>{ 

    try {
     
         const authDoctor = req.authDoctor
        const appointments = await appointmentModel.find({docId : authDoctor._id})

        let totalEarning = 0;
        
        appointments.forEach((elem , index) =>{
             if ( (elem.isPaid || elem.isCompleted)) {
                 totalEarning += elem.amount;                 
             }
        })

        let patients = [];

        
        

        appointments.forEach((elem , index) =>{
            
              if (!patients.includes(elem.userId)) {
 
                   patients.push(elem.userId)
                 
              }

        })

        const dashData = {
               totalAppointments : appointments.length,
               totalPatients : patients.length,
               totalEarning : totalEarning,
               recentAppointments : appointments.splice(0 , 5).reverse()
        }


        return responseHandler(res , 200 , "Dashboard Data : " , dashData)

        
    }
    catch (error) {
        
       return unknownErrorHandler(res , error.message) 

    }

}


//  Mark the Appointment Completed :-
export const markTheAppointmentCompleted = async (req , res) =>{
    
    try {
        
        const authDoctor = req.authDoctor;

        const {appointmentId} = req.params;

        //  Find the Appointment using its Id :-
        const appointmentDetails = await appointmentModel.findByIdAndUpdate(appointmentId , {
             isCompleted : true
        } , {new : true})

        if (!appointmentDetails) {
            
              return errorHandler(res , 400 , "Appointment could not be updated")

        }


        const allAppointments = await appointmentModel.find({docId : authDoctor._id})

        if (!allAppointments) {
             return errorHandler(res , 400 , "All Appointments not found")
        }

        return responseHandler(res , 200 , "Appointment marked Completed" , allAppointments)


    }
    catch (error) {
        
         return unknownErrorHandler(res , error.message)

    }

}


export const getMyProfile = async (req , res) =>{
    
     try {
        
         const authUser = req.authDoctor;

         return responseHandler(res , 200 , "Doctor Profile" , authUser)

     }
     catch (error) {
        
         return unknownErrorHandler(res , error.message)

     }

}


export const updateDoctorProfile = async(req , res) =>{
    
      try {
        
         const authUser = req.authDoctor;
         const updatedDoctorProfile = await doctorModel.findByIdAndUpdate(authUser._id , {...req.body} , {new : true})

         if (!updatedDoctorProfile) {
            
              return errorHandler(res , 400 , "Doctor Profile Could not be Updated")

         }

         return responseHandler(res , 200 , "Doctor Profile Updated SuccessFully" , updatedDoctorProfile)

      }
      catch (error) {
        
         return unknownErrorHandler(res , error.message)

      }

}