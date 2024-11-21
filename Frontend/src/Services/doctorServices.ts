import { BACKEND_URL } from "@/Constants"
import axios from "axios"

export const allDoctorListService = async () =>{
   
    const response = await axios.get(`${BACKEND_URL}/doctor/allDoctorList`)

    return response;
   

}

export const fetchDoctorDetailsById = async(doctorId : string) =>{
    
    const response = await axios.get(`${BACKEND_URL}/doctor/singleDoctor/${doctorId}`)
    return response

}

export const fetchRelatedDoctorById = async (doctorId : string) =>{
    
    const response = await axios.get(`${BACKEND_URL}/doctor/relatedDoctor/${doctorId}`)
    return response
}