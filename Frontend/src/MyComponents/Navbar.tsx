import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import logoSvg from '../assets/assets_frontend/logo.svg'
import {  NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '@/Context/userContext'
import { logoutUserService } from '@/Services/userServices'
import { ProfilePopOver } from './ProfilePopOverComponent'

function Navbar() {

  const {isAuthUser} = useContext(UserContext)
  const navigate = useNavigate()
  console.log(isAuthUser)


  return (
    <div className='w-full h-[4rem] shadow-2xl p-1'>
       <div className='container mx-[8rem]   flex items-center justify-around mt-2 font-semibold'>
             <img src={logoSvg} alt="" className='h-[1.7rem]' />
             <div className='links flex items-center justify-center gap-8'>
                 <NavLink to={"/"}>Home</NavLink>
                 <NavLink to={"/allDoctors"}>All Doctors</NavLink>
                
             </div>
            {
               isAuthUser ?  <ProfilePopOver /> : 
               <Button onClick={() => navigate("/login")} className='text-sm bg-blue-500 hover:bg-blue-600 rounded-full'>Create Account</Button>

            }
       </div>
    </div>
  )
}

export default Navbar
