import { AllAppointmentsTable } from '@/MyComponents/DoctorComponents/AllAppointmentsTable'
import SideBar from '@/MyComponents/SideBar'
import { getMyAppointmentsService } from '@/Services/Doctor/DoctorServices'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function DoctorAppointment() {

  const [allDoctorAppointment , setAllDoctorAppointment] = useState([])
 
  const getAllDoctorAppointment = async () =>{
    
      try {
        const response = await getMyAppointmentsService()

        if (response.data.success) {
            console.log(response.data.data)
           setAllDoctorAppointment(response.data.data)

        }

        else {
           console.log(response.data)
        }
      }
      catch (error) {

         toast.error(error?.response?.data?.message)

      }



  }
  useEffect(() =>{
     getAllDoctorAppointment()
  } , [])

  return (
    <div className='flex items-start'>
      <SideBar />
      
      <div className='mt-5 mx-3'>
          <h1 className='font-semibold text-lg'>All Appointments</h1>

          <div className='appointmentTable'>
               <AllAppointmentsTable allDoctorAppointment = {allDoctorAppointment} setAllDoctorAppointment = {setAllDoctorAppointment}/>
          </div>
      </div>
       
    </div>
  )
}

export default DoctorAppointment
