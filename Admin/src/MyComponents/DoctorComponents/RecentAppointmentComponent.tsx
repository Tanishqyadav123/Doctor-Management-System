import React from 'react'
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

function RecentAppointmentComponent({bookingDetails}) {


   

  return (
    <div className=' w-[50vw] flex items-center justify-between '>
     <div className='flex items-center gap-2'>
            <img src={bookingDetails.userData.userImage} alt="" className='h-12 w-12 object-cover rounded-full' />

                <div className='flex items-start justify-center flex-col gap-1 '>
                <h1 className='text-sm'>{bookingDetails.userData.username}</h1>
                <h2 className='text-xs text-gray-600'>{bookingDetails.slotDate}</h2>
                </div>
     </div>

       <div>
           {
             bookingDetails.isPaid ? <span className='text-green-600 font-semibold'>Paid</span> : bookingDetails.isCompleted ? <span className='text-yellow-600 font-semibold'>Completed</span> : <span className='text-red-600 font-semibold'>Pending</span>
            
           }
       </div>
    </div>
  )
}

export default RecentAppointmentComponent