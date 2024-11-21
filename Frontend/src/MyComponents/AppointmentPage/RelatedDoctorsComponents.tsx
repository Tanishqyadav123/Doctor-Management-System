import React, { useEffect, useState } from 'react'
import SingleDoctorCard from '../HomePage/SingleDoctorCard'
import { useParams } from 'react-router-dom'
import { fetchRelatedDoctorById } from '@/Services/doctorServices'

function RelatedDoctorsComponents() {

  const [relatedDoctorArr , setRelatedDoctorArr] = useState([])
  const {doctorId} = useParams()

  const getRelatedDoctors = async(doctorId : string) =>{
    
      const response = await fetchRelatedDoctorById(doctorId)

      if (response.data?.success) {
        
        console.log(response.data.data)
          setRelatedDoctorArr(response.data.data)

      }

      else {
          throw new Error (response.data)
      }

  }
  useEffect(() =>{
    
     getRelatedDoctors(doctorId)

  } , [doctorId])

  return (
    <div>
        <div className='mb-[4rem] w-[54vw] my-4 flex items-start justify-center flex-col gap-3'>
            <h1 className='text-2xl font-semibold'>Related Doctors</h1>
            <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>

         <div className='flex items-center justify-start gap-5 mt-5 flex-wrap'>

            {
                 relatedDoctorArr.map((docDetails , index) =>{
                     return <SingleDoctorCard key={index} docDetails={docDetails} />
                 })
            }

         </div> 
        
    </div>
  )
}

export default RelatedDoctorsComponents
