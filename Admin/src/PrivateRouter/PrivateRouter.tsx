import AdminContext from '@/Context/adminContext';
import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRouter() {

    const {adminInfo} = useContext(AdminContext)

    console.log(adminInfo)

   

   
    

  return (
    <div>
      {
         adminInfo ? <Outlet /> : <Navigate to={"/"} />
      }
    </div>
  )
}

export default PrivateRouter
