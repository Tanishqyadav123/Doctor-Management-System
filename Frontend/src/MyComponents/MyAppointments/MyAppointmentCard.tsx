import React from 'react'
import {appointmentDataType} from '../../Types'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { cancelAppointmentByIdService } from '@/Services/AppointmentService'
import { payThroughRazorPayOnlineService, verifyRazorPayPaymentService } from '@/Services/userServices'
import { BACKEND_URL, RAZORPAY_KEY_ID } from '@/Constants'

function MyAppointmentCard({appointmentDetails , allAppointments , setAllAppointments}) {
 
   console.log(appointmentDetails)

  const handleCancelAppointment = async(appointmentDetails) =>{
    
      try {
        
          const response = await cancelAppointmentByIdService(appointmentDetails._id)

          if (response.data.success) {
            
               const updatedAppointmentsList = await allAppointments.filter((elem ) =>{
                    if (elem._id.toString() != appointmentDetails._id.toString()) {
                         return elem;
                    }
               })

               setAllAppointments(updatedAppointmentsList)
               toast.success(response.data.message)

          }

      }
      catch (error) {
         
         toast.error(error?.response?.data?.message)

      }
    

  }


  //  Intiating the payment process :-
  const initPay = (order) =>{

     const options = {
         
        key : RAZORPAY_KEY_ID,
        amount : order.amount,
        currency : order.currency,
        name : "Appointment Payment",
        description : "Paying Online for the appointment that you have booked",
        order_id : order.id,
        receipt : order.receipt,
        handler : async(response) =>{
              console.log(response)

              // Verifying the Payment in the Backend :-
             try {
              
                const verifyResponse = await verifyRazorPayPaymentService(response)
                console.log(verifyResponse)

                if (verifyResponse?.data?.success){
                    setAllAppointments(verifyResponse.data.data)

                    
                }
             }
             catch(error) {
                 toast.error(error?.response?.data?.message)
             }

        }

     }

     const rzp = new window.Razorpay(options)
     rzp.open()

  }

  //  Handler for paying online for booking appointment :-
   const handlePayOnline = async (appointmentId) =>{
    
       try {
        
        const response = await payThroughRazorPayOnlineService(appointmentId)

        if (response.data.success) {
          
            //  Intialize the Payment :-
            console.log(response.data.order)
            initPay(response.data.order)
  
        }
        else {
           console.log("Error Occured " , response.data )
        }

       }
       catch (error) {
          toast.error(error?.response?.data?.message)
       }

   }
  
  
  return (
    <div className='flex items-center justify-between shadow-xl my-2  '>
         <div className='flex items-center justify-start gap-4'>
                <img src={appointmentDetails.docData.doctorImage} alt="" className='h-[12rem] w-[12rem] object-cover border-2' />
                <div className='mt-2 flex items-start justify-start flex-col gap-4'>
                    <div className='flex items-start justify-start flex-col gap-0'>
                        <h2 className='text-lg'>{appointmentDetails.docData.doctorName}</h2>
                        <p className='text-xs text-gray-600'>{appointmentDetails.docData.speciality}</p>
                    </div>
                    <div className='flex items-start justify-start flex-col gap-2'>
                        <h2 className='text-xs text-gray-600 font-bold'>Address</h2>
                        <p className='text-xs text-gray-600'>{appointmentDetails.docData.address}</p>
                    </div>
                    <div className='flex items-start justify-start flex-col gap-2'>
                        <h2 className='text-xs text-gray-600 font-bold'>Date&Time</h2>
                        <p className='text-xs text-gray-600'>{appointmentDetails.slotDate} | {appointmentDetails.slotTime}</p>
                    </div>
                </div>
         </div>
         <div className='flex items-start  justify-center flex-col gap-2'>
          {
              appointmentDetails.isPaid ?  <Button className='w-full px-8 text-xs py-4 bg-green-500 hover:bg-green-600 transition-all'>Paid</Button> :  <Button onClick={() => handlePayOnline(appointmentDetails._id)} className='w-full px-8 text-xs py-4 bg-blue-500 hover:bg-blue-600 transition-all'>Pay Now</Button>
          }
            <Button className='w-full px-8 text-xs py-4 bg-white border-2 border-gray-300 hover:bg-red-500
            hover:text-white text-black transition-all' onClick={() =>handleCancelAppointment(appointmentDetails)}>Cancel Appointment</Button>
         </div>
    </div>
  )
}

export default MyAppointmentCard
