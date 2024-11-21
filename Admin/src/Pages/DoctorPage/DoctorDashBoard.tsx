import AdminDashBoardCard from '@/MyComponents/AdminDashBoardCard'
import SideBar from '@/MyComponents/SideBar'
import React, { useEffect, useState } from 'react'
import earningIcon from '../../assets/assets_admin/earning_icon.svg'
import patientIcon from '../../assets/assets_admin/patients_icon.svg'
import appointmentIcon from '../../assets/assets_admin/appointments_icon.svg'
import { getDoctorDashboardDataService } from '@/Services/Doctor/DoctorServices'
import { toast } from 'react-toastify'
import RecentAppointmentComponent from '@/MyComponents/DoctorComponents/RecentAppointmentComponent'

function DoctorDashBoard() {

   const [dashboardData , setdashboardData] = useState({})
   const getDashboardData = async () =>{
    
      try {
        const response = await getDoctorDashboardDataService ()
  
        console.log(response.data , " Data for Dashboard")
  
        if (response.data.success) {
          
              setdashboardData(response.data.data)

        }
      } catch (error) {
           toast.error(error?.response?.data?.message)
      }

   }
   useEffect(() => {
    
      getDashboardData ()

   } , [])

  return (
    <div className='flex '>
        <SideBar />
        <div className='mt-12 ml-5 '>
             
              <div className='flex items-start gap-4'>
                <AdminDashBoardCard icon={earningIcon} cardName={"Earning"} totalCount={dashboardData.totalEarning}/>
                <AdminDashBoardCard icon={patientIcon} cardName={"Patients"} totalCount={dashboardData.totalPatients} />
                <AdminDashBoardCard icon={appointmentIcon} cardName={"Appointments"} totalCount={dashboardData.totalAppointments} />
              </div>

              <div className='recentAppointments mt-12'>

                    <h1 className='text-lg font-semibold text-gray-700 '>All Recent Appointments</h1> 

                     <div className='mt-6'>

                          {
                            dashboardData &&  <div className='flex items-start gap-4 flex-col'>
                            {
                                dashboardData?.recentAppointments?.map((bookingDetails , index) =>{
                                    return <RecentAppointmentComponent key={index} bookingDetails={bookingDetails} />
                                })
                            }

                            </div>
                          }

                     </div>

              </div>
             
        </div>

       
    </div>
  )
}

export default DoctorDashBoard
