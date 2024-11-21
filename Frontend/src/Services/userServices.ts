import { BACKEND_URL } from "@/Constants"
import axios from "axios"

export const registerUserService = async (userFormData) =>{
    
    const response = await axios.post(`${BACKEND_URL}/user/createNewUser` , userFormData)

    return response

}
export const loginUserService = async (userFormData) =>{
    
    const response = await axios.post(`${BACKEND_URL}/user/loginUser` , userFormData , {withCredentials : true})

    return response

}
export const logoutUserService = async () =>{
    
    const response = await axios.get(`${BACKEND_URL}/user/logoutUser`  , {withCredentials : true})
    console.log(response)
    return response

}

export const updateUserService = async (updateUserFormData) =>{
    
     const response = await axios.put(`${BACKEND_URL}/user/updateUserProfile` , updateUserFormData , {withCredentials : true})
     return response

}

export const bookAppointmentService = async (slotDate , slotTime , docId , fees) =>{
    
    const response = await axios.post(`${BACKEND_URL}/appointment/bookAnAppointment` , {slotDate , slotTime , docId , amount : fees} , {withCredentials : true})

    return response

}

export const payThroughRazorPayOnlineService = async (appointmentId) =>{
    
      const response = await axios.post(`${BACKEND_URL}/user/paymentThroughRazorPay` , {appointmentId} , {withCredentials : true})
       console.log(response)
      return response

}

export const verifyRazorPayPaymentService = async  (response) =>{
    const verifyResponse = await axios.post(`${BACKEND_URL}/user/verifyRazorPayment` , {razorpay_order_id : response.razorpay_order_id} , {withCredentials : true})
    return verifyResponse
}