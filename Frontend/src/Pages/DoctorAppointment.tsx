import React, { useEffect, useState } from 'react'
import doc1 from '../assets/assets_frontend/doc1.png'
import DoctorDetailsSection from '@/MyComponents/AppointmentPage/DoctorDetailsSection'
import BookingSlotComponent from '@/MyComponents/AppointmentPage/BookingSlotComponent'
import RelatedDoctorsComponents from '@/MyComponents/AppointmentPage/RelatedDoctorsComponents'
import FooterComponent from '@/MyComponents/FooterComponent'
import { useParams } from 'react-router-dom'
import { fetchDoctorDetailsById } from '@/Services/doctorServices'
function DoctorAppointment() {


  const {doctorId} = useParams()
  const [doctorDetails , setDoctorDetails] = useState({})
  
  const fetchDoctorDetails = async (doctorId : string) =>{

    const response = await fetchDoctorDetailsById(doctorId)

    if (response.data?.success) {
      setDoctorDetails (response.data.data)
      console.log(response.data)
    }

    else {
       throw new Error(response.data)
    }

  }
  useEffect(() =>{
     fetchDoctorDetails(doctorId)
  } , [doctorId])


  return (
    <div className='mx-[5rem] mt-[4rem]'>
       
       <div className='doctor-details flex items-start justify-center gap-4 flex-col'>
              <div className='  flex items-center justify-center gap-5'>
              <img src={doctorDetails?.doctorImage} alt="" className='h-[20rem] w-[20rem] bg-blue-500 rounded-lg object-cover'  />
                <DoctorDetailsSection doctorDetails = {doctorDetails}  />
              </div>
              <div className='flex items-start gap-4 justify-center flex-col'>
                <BookingSlotComponent doctorDetails = {doctorDetails} />
                <RelatedDoctorsComponents />
              
              </div>
       </div>
      
    </div>
  )
}

export default DoctorAppointment
