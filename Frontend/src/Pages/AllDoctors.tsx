import RenderAllDoctors from '@/MyComponents/AllDoctorsComponents/RenderAllDoctors'
import SideBarComponent from '@/MyComponents/AllDoctorsComponents/SideBarComponent'
import FooterComponent from '@/MyComponents/FooterComponent'
import React from 'react'

function AllDoctors() {
  return (
    <div className='flex items-start justify-center'>
        <SideBarComponent />
       <div>
       <RenderAllDoctors />
       <FooterComponent />
       </div>

    </div>
  )
}

export default AllDoctors
