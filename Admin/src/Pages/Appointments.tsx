import { AdminAppointmentListTable } from '@/MyComponents/AdminAppointmentListTable'
import SideBar from '@/MyComponents/SideBar'
import { getAllAppointmentsService } from '@/Services/Admin/AddingNewDoctorServices'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Appointments() {

  const [allAppointmentList , setAllAppointmentsList] = useState([])
  const getAllAppointments = async () =>{
    
       try {
        
          const response = await getAllAppointmentsService()
          setAllAppointmentsList(response.data.data)
          console.log(response.data.data)


       } catch (error) {
        
           toast.error(error?.response?.data?.message)

       } 

  }

  useEffect(() =>{
    
    getAllAppointments ()

  } , [])

  return (
    <div className='flex'>
       <SideBar />  
       {
         <AdminAppointmentListTable allAppointmentList = {allAppointmentList}  setAllAppointmentsList = {setAllAppointmentsList} />
       }
    </div>
  )
}

export default Appointments
