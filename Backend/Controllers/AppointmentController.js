import { appointmentModel } from "../Models/AppointmentModel.js";
import { doctorModel } from "../Models/doctorModel.js";
import { errorHandler } from "../Utils/ErrorHandler.js";
import { responseHandler } from "../Utils/ResponseHandler.js";
import { unknownErrorHandler } from "../Utils/UnknownErrorHandler.js";

// Controller for booking an Appointment :-

export const bookAnAppointment = async (req, res) => {
  try {
    const authUser = req.user;
    const { docId, slotTime, slotDate, amount } = req.body;
     console.log(req.body)
    if (!docId || !slotTime || !slotDate || !amount) {
      console.log("Appointment for Object")
      return errorHandler(
        res,
        400,
        "Please Provide all the details for booking the slot"
      );
    }

    //   Step - 1 :- find the details of doctor from the doctor Id :-
    const docData = await doctorModel.findById(docId).select("-doctorPassword");

    if (!docData) {
      return errorHandler(res, 404, "DoctorDetails not found for this Id");
    }

    //  Check whether the slot for particular doctor is available or not :-
    const doctorSlots = docData.slots_booked;
    console.log("OutSide " ,doctorSlots)
    if (doctorSlots[slotDate]){
        
        //   Doctor Already have an appointment on that day :-
        if (doctorSlots[slotDate].includes(slotTime)){
            //   already have an booking for that slot :-
            return errorHandler(res , 400 , "Requested slot is unavailable")
        }

        else {
            console.log(doctorSlots[slotDate])
            console.log("object is here " , doctorSlots[slotDate])
            doctorSlots[slotDate]?.push(slotTime);
            var updatedDocData = await doctorModel.findByIdAndUpdate(docId , {...docData , slots_booked : doctorSlots} , {new : true})

        }

    }
    else {
         doctorSlots[slotDate] = [];
         doctorSlots[slotDate]?.push(slotTime);
         console.log(doctorSlots)
     
        
         var updatedDocData = await doctorModel.findByIdAndUpdate(docId , {...docData , slots_booked : doctorSlots} , {new : true})
         console.log(docData)
    }

    //  Now Create the appointment :-
    const newAppointment = await appointmentModel.create({
         userId : authUser._id,
         docId : docId,
         docData : updatedDocData,
         userData : authUser,
         amount,
         slotDate,
         slotTime
    })

    if (!newAppointment){
         return errorHandler(res , 400 , "Slot Could not be booked")
    }


    return responseHandler(res , 201 , "Slot Booked SuccessFully" , newAppointment) 

  } catch (error) {
    return unknownErrorHandler(res, error.message);
  }
};

export const getAllMyAppointment = async(req , res) =>{
     
  try {
    
    const authUser = req.user;

    const myAllAppointments = await appointmentModel.find({
        userId : authUser._id
    })

    if (!myAllAppointments) {
         return errorHandler(res , 400 , "Not appointments found")
    }

    return responseHandler(res , 200 , "All Of My Appointments" , myAllAppointments)

  }
  catch (error) {
    
      return unknownErrorHandler(res , error.message)

  }

}