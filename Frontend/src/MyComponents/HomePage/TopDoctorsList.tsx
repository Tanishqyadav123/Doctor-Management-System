import { topDoctorSArr } from "@/Constants"
import SingleDoctorCard from "./SingleDoctorCard"
import { useEffect, useState } from "react"
import { allDoctorListService } from "@/Services/doctorServices"

function TopDoctorsList() {

  const [allDoctors , setAllDoctors] = useState([])
  const getAllDoctors = async () =>{
    
      const response = await allDoctorListService()
      
      console.log(response.data)
      setAllDoctors(response.data.data)
    

  }
  useEffect(() =>{
     getAllDoctors ()
  }  ,[])

  return (
    <div className="mx-[5rem] text-center">
         <h1 className="text-2xl font-[500]">Top Doctors To Book</h1>
         <p className="text-xs mt-4 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit.</p>

         <div className="flex flex-wrap items-center justify-center gap-4 mt-[5rem]">
         {
             allDoctors.map((docDetails , index) =>{
                  return <SingleDoctorCard docDetails = {docDetails} key={index} />
             })
         }
         </div>
    </div>
  )
}

export default TopDoctorsList
