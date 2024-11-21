import React from 'react'

function AdminDashBoardCard({totalCount , icon , cardName}) {
  return (
    <div className='w-[15vw] flex items-center gap-2 hover:-translate-y-4 transition-all'>
      
        <img src={icon} alt="" className='h-18 w-18' />

        <div>
            <h2 className='text-xl font-semibold text-gray-700'>{totalCount}</h2>
            <h2 className='text-gray-500'>{cardName}</h2>
        </div>

    </div>
  )
}

export default AdminDashBoardCard
