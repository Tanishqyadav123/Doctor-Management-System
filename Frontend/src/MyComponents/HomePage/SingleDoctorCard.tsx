import React from 'react'
import { useNavigate } from 'react-router-dom'

function SingleDoctorCard({docDetails}) {

  const navigate = useNavigate()
  const handleNavigateToDoctorAppointment = (doctorId : string) =>{
    navigate (`/appointment/${doctorId}`)
  }

  return (
    <div className='mt-2'>
      <div onClick={() =>{ handleNavigateToDoctorAppointment(docDetails._id); scrollTo(0,0)}} className="hover:-translate-y-4  transition-all w-[15rem] h-[25rem] border-2 border-gray-300 shadow-2xl bg-white cursor-pointer rounded-lg  dark:bg-gray-800 dark:border-gray-700">
    
        <img className="rounded-t-lg h-[14rem] w-[14rem] object-cover" src={docDetails.doctorImage} alt=""  />
   
    <div className="p-5 text-center">
        
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{docDetails.doctorName}</h5>
        
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{docDetails.speciality}</p>
        <p  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center">
            {docDetails.available ? <span className='text-green-500'>Available</span>  : <span className='text-red-500'>Not Available</span> }
           
        </p>
    </div>
</div>
    </div>
  )
}

export default SingleDoctorCard
