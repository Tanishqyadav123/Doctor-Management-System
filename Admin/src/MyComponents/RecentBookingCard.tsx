import React from 'react'

function RecentBookingCard({bookingDetails}) {
  return (
    <div className='flex items-center gap-2'>
      <img src={bookingDetails.docData.doctorImage} alt="" className='h-12 w-12 object-cover rounded-full' />

      <div className='flex items-start justify-center flex-col gap-1 '>
        <h1 className='text-sm'>{bookingDetails.docData.doctorName}</h1>
        <h2 className='text-xs text-gray-600'>{bookingDetails.slotDate}</h2>
      </div>
    </div>
  )
}

export default RecentBookingCard
