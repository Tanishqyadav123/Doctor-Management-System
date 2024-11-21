import { topDoctorSArr } from '@/Constants'
import React, { useEffect, useState } from 'react'
import SingleDoctorCard from '../HomePage/SingleDoctorCard'
import { useParams } from 'react-router-dom'
import { allDoctorListService } from '@/Services/doctorServices'

function RenderAllDoctors() {

  const {specificationName} = useParams()
  console.log(specificationName , "specificationName")

  // Fetching all the doctorList :-
  const [allDoctors , setAllDoctors] = useState([])
  const getAllDoctors = async () =>{
    
      const response = await allDoctorListService()
      
      console.log(response.data)
      setAllDoctors(response.data.data)
    

  }
  useEffect(() =>{
     getAllDoctors ()
  }  ,[specificationName])

  return (
    <div className='w-[70vw]'>
         {
           specificationName ?   <div className="flex flex-wrap items-center justify-center gap-4 mt-[5rem]">
           {
               allDoctors.map((docDetails , index) =>{
                   if (docDetails?.speciality === specificationName) {
                    return <SingleDoctorCard docDetails = {docDetails} key={index} />
                   }
               })
           }
           </div> :   <div className="flex flex-wrap items-center justify-center gap-4 mt-[5rem]">
         {
             allDoctors.map((docDetails , index) =>{
                  return <SingleDoctorCard docDetails = {docDetails} key={index} />
             })
         }
         </div>
         }
    </div>
  )
}

export default RenderAllDoctors
