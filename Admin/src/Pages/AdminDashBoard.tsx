import AdminDashBoardCard from '@/MyComponents/AdminDashBoardCard'
import SideBar from '@/MyComponents/SideBar'
import { getAdminDashboardDataService } from '@/Services/Admin/AddingNewDoctorServices'
import React, { useEffect, useState } from 'react'
import doctorIcon from '../assets/assets_admin/doctor_icon.svg'
import PatientIcon from '../assets/assets_admin/patients_icon.svg'
import appointmentIcon from '../assets/assets_admin/appointments_icon.svg'
import recentBookingIcon from '../assets/assets_admin/list_icon.svg'
import RecentBookingCard from '@/MyComponents/RecentBookingCard'

function AdminDashBoard() {

   const [doctorCount , setDoctorCount] = useState("")
   const [patientCount , setPatientCount] = useState("")
   const [appointmentCount , setAppointmentCount] = useState("")
   const [recentAppointments , setRecentAppointment] = useState([])
  const getAdminDashBoardData = async() =>{
    
       try {
        
          const response = await getAdminDashboardDataService()

          console.log(response.data)

          const data = response.data.data
          setDoctorCount(data.allDoctorsCount)
          setAppointmentCount(data.allAppointmentsCount)
          setPatientCount(data.allPatientCount)
          setRecentAppointment(data.recentAppointments)

       }
       catch (error) {
         console.log(error?.response?.data?.message)
       }

  }
  useEffect(() =>{
    
     getAdminDashBoardData ()

  } , [])

  return (
    <div className='flex'>
       <SideBar />
       
       <div className='mt-8'>
           <div className='flex items-center '>
              <AdminDashBoardCard totalCount = {doctorCount} icon = {doctorIcon} cardName = {"Doctors"} />
              <AdminDashBoardCard totalCount = {patientCount} icon = {PatientIcon} cardName = {"Patients"}/>
              <AdminDashBoardCard totalCount = {appointmentCount} icon = {appointmentIcon} cardName = {"Appointments"}/>
           </div>

           <div className='latestBooking mt-[4rem]'>
               <div className='flex items-center gap-4'>
                  <img src={recentBookingIcon} alt="" className='h-6 w-6' />
                  <span className='text-xl text-gray-600'>Latest Appointments</span>
               </div>
               
               <div className='flex items-start mt-8 justify-center gap-8 flex-col'>
                    {
                       recentAppointments.map((booking , index) =>{
                        
                           return  <RecentBookingCard key={index} bookingDetails={booking} />

                       })
                    }
               </div>

           </div>
       </div>
     
    </div>
  )
}

export default AdminDashBoard
