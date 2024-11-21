import AdminContext from '@/Context/adminContext'
import SideBar from '@/MyComponents/SideBar'
import SingleDoctorCard from '@/MyComponents/singleDoctorCard'
import { fetchAllDoctorsService } from '@/Services/Admin/AddingNewDoctorServices'
import React, { useContext, useEffect, useState } from 'react'

function DoctorList() {

    const {allDoctors , setAllDoctors } = useContext(AdminContext)
    console.log(allDoctors)

  

     
    
  
  
    
    
  return (
    <div className='flex'>
         <SideBar />
         <div className='px-4  py-8'>
               <h1 className='uppercase text-sm text-gray-700'>All Doctors</h1>

               <div className='flex items-center justify-start gap-8 flex-wrap mt-8'>
                     {
                       allDoctors.map((doctorInfo , index) =>{
                        
                           return <SingleDoctorCard key={index} doctorInfo = {doctorInfo} setAllDoctors = {setAllDoctors} allDoctors = {allDoctors} />

                       })
                     }
               </div>
         </div>
    </div>
  )
}

export default DoctorList
