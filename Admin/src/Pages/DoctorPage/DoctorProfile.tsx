import { Button } from '@/components/ui/button'
import SideBar from '@/MyComponents/SideBar'
import { geyMyProfileService, updateDoctorProfileService } from '@/Services/Doctor/DoctorServices'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function DoctorProfile() {

  const [doctorDetails , setDoctorDetails] = useState({})
  const [isEditable , setIsEditable] = useState (false)
  const navigate = useNavigate()

  const getDoctorDetails = async() =>{
    
      try {
       
         const response = await geyMyProfileService()

         if (response.data.success){
          
              setDoctorDetails(response.data.data)
              console.log(response.data)

         }

         else {
             console.log(response.data)
         }
        
      }
      catch (error){
        
          toast.error(error?.response?.data?.message)

      }

  }

  const handleChange = (e) =>{
       
    console.log("object")
      setDoctorDetails({...doctorDetails , [e.target.name] : e.target.value})

  }

  const handleCheckBox = (e) =>{
     setDoctorDetails({...doctorDetails , available : !doctorDetails.available})
  }


  const handleUpdateDoctorDetails = async () =>{
     
       console.log(doctorDetails)
       
       try {
        
          const response = await updateDoctorProfileService(doctorDetails)

          if (response.data.success) {
            
               setIsEditable(false)
               console.log(response.data.message)
               navigate("/docDashBoard")

          }

       }
       catch (error) {
        
           toast.error(error?.response?.data?.message)

       }


  }

  useEffect(() =>{
     getDoctorDetails()
  } , [])

  return (
    <div className='flex items-start'>
      <SideBar />

      <div className='mt-8'>
            <img src={doctorDetails?.doctorImage} alt="" className='h-[16rem] w-[16rem] object-cover' />

            <div className='ml-6 flex flex-col items-start gap-3 mt-5'>
                {
                   isEditable ? <input type="text" name='doctorName' value={doctorDetails?.doctorName} onChange={handleChange} /> : <h1 className='text-2xl font-bold text-gray-700'>{doctorDetails?.doctorName}</h1>
                }
               <div className='flex items-center gap-3'>
                  <h2 className='text-md text-gray-600 '>{doctorDetails?.degree} - {doctorDetails?.speciality}</h2>
                  {
                     isEditable ? <input type="text" name='experience' value={doctorDetails?.experience} onChange={handleChange} /> : <span className='text-sm text-gray-600'>{doctorDetails?.experience}</span>
                  }
               </div>

                 <div className='mt-3'>
                        <h2 className='text-sm font-semibold'>About:</h2>
                        {
                           isEditable ? <textarea name="about" cols={50}  rows={3} value={doctorDetails?.about} onChange={handleChange} id=""></textarea> : <p className='text-gray-700 mt-1'>{doctorDetails?.about}</p>
                        }
                 </div>
                 <div className='mt-3 flex items-center gap-3'>
                        <h2 className='text-md font-semibold'>Appointment Fees:</h2>
                       {
                         isEditable ? <input type="number" value={doctorDetails?.fees} name='fees' onChange={handleChange} /> :  <p className='text-[1.1rem] font-bold'>${doctorDetails?.fees}</p>
                       }
                 </div>
                 <div className='mt-3 flex items-center gap-3'>
                        <h2 className='text-md font-semibold'>Address:</h2>
                       {
                          isEditable ? <input type="text" name='address' value={doctorDetails?.address} onChange={handleChange} /> :  <p className='text-sm font-semibold text-gray-700'>{doctorDetails?.address}</p>
                       }
                 </div>
                 <div className='mt-3 flex items-center gap-3'>
                        <input type='checkbox' className='text-md font-semibold' name='available'  checked = {doctorDetails?.available} onChange={handleCheckBox}/>
                        <label className='text-md font-semibold text-gray-700' >Available</label>
                 </div>

                 <div className='mt-4'>

                    {
                       
                     !isEditable ? <Button onClick={() => setIsEditable(true)}  className='bg-white hover:bg-blue-500 hover:border-none hover:text-white transition-all text-black text-xs rounded-full py-2 px-6 border-[1px] border-gray-400'>Edit</Button> :  <Button  onClick={handleUpdateDoctorDetails} className='bg-white hover:bg-blue-500 hover:border-none hover:text-white transition-all text-black text-xs rounded-full py-2 px-6 border-[1px] border-gray-400'>Save</Button>  
                    }
                 </div>
                  
            </div>
      </div>
    </div>
  )
}

export default DoctorProfile
