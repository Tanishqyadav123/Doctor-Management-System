import { doctorSpecificationArr } from '@/Constants'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function SideBarComponent() {
   const [specialityName , setSpecialityName] = useState("")  
   const {specificationName} = useParams()
   
   const navigate = useNavigate()

   const handleSpecificationClick = (specificationName : string) =>{
      console.log(specificationName)
       if (specialityName == "" || specialityName != specificationName) {
          setSpecialityName(specificationName)
          navigate(`/doctor/${specificationName}`)
       }
       else if (specialityName == specificationName){
          setSpecialityName("")
          navigate("/allDoctors")
       }
       
   }

  return (
    <div className=''>


<aside id="logo-sidebar" className=" z-40 w-[12rem] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
 
      <ul className="space-y-4 font-medium">
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="ms-3">Browse Doctor</span>
            </a>
         </li>
       
       { 
        doctorSpecificationArr.map((specificationName , index) =>{
              return <p onClick={() => handleSpecificationClick(specificationName)} className={` cursor-pointer text-sm p-2 font-[400] shadow-2xl ${specialityName == specificationName ? "font-semibold" : ""} `} key={index}> {specificationName} </p>
        })
       }

      </ul>
   </div>
</aside>



    </div>
  )
}

export default SideBarComponent
