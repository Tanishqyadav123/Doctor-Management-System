import { BACKEND_URL } from "@/Constants"
import axios from "axios"

export const addingNewDoctorService = async (doctorFormData) =>{
    
    const response = await axios.post(`${BACKEND_URL}/admin/addDoctor` , doctorFormData , {withCredentials : true})
    return response

}
export const fetchAllDoctorsService = async () => {
    
     const response = await axios.get(`${BACKEND_URL}/admin/getAllDoctors` , {withCredentials : true})
     return response

}
 
export const manageDoctorAvailability = async(docId : string) =>{
     console.log(docId)
     const response = await axios.get(`${BACKEND_URL}/admin/manageDoctorAvailability/${docId}` , {withCredentials : true})

     return response

}

export const getAllAppointmentsService = async() =>{
     
      const response = await axios.get(`${BACKEND_URL}/admin/getAllAppointments` , {withCredentials : true})

      return response

}
export const cancelAppointmentByIdService = async(appointmentId) => {
    
     const response = await axios.delete(`${BACKEND_URL}/admin/cancelAppointmentById/${appointmentId}` , {
         withCredentials : true
     })
 
     return response
 
 }

   
export const getAdminDashboardDataService = async() =>{
     
      const response = await axios.get(`${BACKEND_URL}/admin/getAdminDashboardData` , {withCredentials : true})

      return response

}
