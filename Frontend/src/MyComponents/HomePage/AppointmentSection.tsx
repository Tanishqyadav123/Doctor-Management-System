import React from 'react'
import appointmentImage from '../../assets/assets_frontend/appointment_img.png'
import { Button } from '@/components/ui/button'
import arrowIcon from '../../assets/assets_frontend/arrow_icon.svg'
function AppointmentSection() {
  return (
    <div className='h-[40vh] mx-[10rem] mt-[7rem] bg-blue-500 rounded flex items-center justify-between p-5'>
      
       <div className='flex items-start justify-center flex-col gap-5 ml-10'>
            <h1 className='text-4xl font-bold text-white'>Book Appointment </h1> 
            <h1 className='text-4xl font-bold text-white'>With 100+ Trusted Doctor</h1>
        

            <Button className='text-xs font-[400] rounded-full bg-white hover:bg-gray-300 text-black '>Create Account <img src={arrowIcon} alt="" /> </Button>

       </div>
       <div>
        <img src={appointmentImage} alt="" className='h-[23rem] mb-[4.4rem] ' />
       </div>

    </div>
  )
}

export default AppointmentSection
