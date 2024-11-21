import { myAppointmentsData } from '@/Constants'
import MyAppointmentCard from '@/MyComponents/MyAppointments/MyAppointmentCard'
import { getMyAppointmentsService } from '@/Services/AppointmentService'
import { appointmentDataType } from '@/Types'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function MyAppointments() {

  const [allAppointments , setAllAppointments] = useState([])

  const getAllAppointments = async() =>{
   
      try {
        
        const response = await getMyAppointmentsService()
        console.log(response.data)
        setAllAppointments(response.data.data?.reverse())

      }
      catch(error) {
        
        toast(error?.response?.data?.message)

      }
    
  }
  useEffect(() =>{
     getAllAppointments ()
  } , []) 
    

  return (
    <div className=' h-screen  mx-[8rem] mt-[3rem]'>

     <h1 className="text-blue-800 text-xl">My Appointments</h1>

     <div className='mt-[2rem] flex flex-col gap-3  '>
        {
             allAppointments.map((appointmentDetails : appointmentDataType , index) =>{
                 return <MyAppointmentCard key={index} appointmentDetails={appointmentDetails} allAppointments = {allAppointments} setAllAppointments = {setAllAppointments} />
             })
        }
     </div>
    </div>
  )
}

export default MyAppointments
