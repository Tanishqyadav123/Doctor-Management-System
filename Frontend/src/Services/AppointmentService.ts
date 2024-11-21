import { BACKEND_URL } from "@/Constants"
import axios from "axios"

export const getMyAppointmentsService = async() =>{
    
    const response = await axios.get(`${BACKEND_URL}/appointment/getMyAppointments` , {withCredentials : true})
    return response

}

export const cancelAppointmentByIdService = async(appointmentId) => {
    
    const response = await axios.delete(`${BACKEND_URL}/appointment/cancelAppointmentById/${appointmentId}` , {
        withCredentials : true
    })

    return response

}