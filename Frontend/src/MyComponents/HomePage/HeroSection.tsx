import React from 'react'
import heroImage from '../../assets/assets_frontend/header_img.png'
import groupProfile from '../../assets/assets_frontend/group_profiles.png'
import { Button } from '@/components/ui/button'
import arrowIcon from '../../assets/assets_frontend/arrow_icon.svg'
function HeroSection() {
  return (
    <div className='h-[60vh] mx-[10rem] mt-[5rem] bg-blue-600 rounded flex items-center justify-between p-5'>
      
       <div className='flex items-start justify-center flex-col gap-5 ml-10'>
            <h1 className='text-5xl font-bold text-white'>Book Appointment </h1> 
            <h1 className='text-5xl font-bold text-white'>With Trusted Doctors</h1>
            <div className='w-[34vw] text-white text-md flex items-center justify-center gap-5'>
                <img src={groupProfile} alt="" className='h-[2.1rem]'/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae consectetur temporibus</p>
            </div>

            <Button className='text-xs font-[400] rounded-full bg-white hover:bg-gray-300 text-black '>Book Appointment <img src={arrowIcon} alt="" /> </Button>

       </div>
       <div>
        <img src={heroImage} alt="" className='h-[23rem] mt-[4.7rem]' />
       </div>

    </div>
  )
}

export default HeroSection
