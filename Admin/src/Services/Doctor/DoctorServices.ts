import { BACKEND_URL } from "@/Constants"
import axios from "axios"

export const doctorLoginService = async(doctorDetails) =>{
    
    const response = await axios.post(`${BACKEND_URL}/doctor/login` , doctorDetails , {withCredentials : true})

    return response;
      

}

export const getMyAppointmentsService = async() =>{
    
     const response = await axios.get(`${BACKEND_URL}/doctor/getMyAppointments`, {withCredentials : true})

     return response

}

export const getDoctorDashboardDataService = async () =>{
    
     const response = await axios.get(`${BACKEND_URL}/doctor/getDashboardData` , {withCredentials : true})
     return response

}

export const markTheAppointmentCompletedService = async (appointmentId) =>{
    
     const response = await axios.get(`${BACKEND_URL}/doctor/markAppointmentCompletedById/${appointmentId}` , {withCredentials : true} )

     return response

}

export const geyMyProfileService = async() =>{
    
     const response = await axios.get(`${BACKEND_URL}/doctor/getMyProfile` , {withCredentials : true})
     
     return response
}

export const updateDoctorProfileService = async(updatedDoctorDetails) =>{
    
      const response = await axios.post(`${BACKEND_URL}/doctor/updateDoctorProfile` , updatedDoctorDetails , {withCredentials : true})

      return response;

} 