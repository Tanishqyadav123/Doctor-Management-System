import React, { useContext, useState } from 'react'
import doc1 from '../assets/assets_frontend/doc1.png'
import { Button } from '@/components/ui/button'
import { UserContext } from '@/Context/userContext'
import { updateUserService } from '@/Services/userServices'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function Profile() {

  const {isAuthUser , setIsAuthUser} = useContext(UserContext)  
  console.log(isAuthUser)
  const [userProfileDetails , setUserProfileDetails] = useState(isAuthUser)
  const [isEditable , setIsEditable] = useState(false)
  const [isMouseEntered , setIsMouseEntered] = useState(false)
  const [profileImage , setProfileImage] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) =>{
      console.log(e.target.value)
     setUserProfileDetails({...userProfileDetails , [e.target.name] : e.target.value})
  }

  const handleMouseEnter = (e) =>{
    setIsMouseEntered(true)
  }

  const handleMouseLeave = () =>{
    setIsMouseEntered(false)
  }
  
  const handleProfileImageChange = (e) =>{
      
    setProfileImage (e.target.files[0])
  }


  // Handling save Information after editing :-
  const handleSaveInfo = async() =>{
    
      

      // Creating the formData :-

      const updateUserFormData = new FormData()

      updateUserFormData.append("profileImage" , profileImage);

      for ( var key in userProfileDetails ) {
        updateUserFormData.append(key, userProfileDetails[key]);
    }

      // API calling for updating user details :-
   try {
    const response = await updateUserService(updateUserFormData)

    if (response.data.success) {
      setIsEditable(false)
      setIsAuthUser(response.data.data)
      localStorage.setItem("userDetails" , JSON.stringify(response.data.data))
      toast.success(response.data.message)
      navigate("/")
      
      
    }
    else {
       console.log(response.data)
    }
   }
   catch(error) {
    toast.error(error?.response?.data?.message)
   }

      
    
  }


  
  return (
    <div className=' h-screen flex items-start justify-start mx-[6rem]'>
        <div className='main p-12 flex items-start justify-center flex-col gap-8'>
           {
              !isMouseEntered ?  <img src={isAuthUser.userImage} alt="" className='h-[10rem] w-[10rem] border-2 border-gray-300 bg-blue-500 rounded object-cover' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/> : <div className='relative'>
                  <img src={isAuthUser.userImage} alt="" className={` ${isMouseEntered ? "opacity-45" : ""} h-[10rem] w-[10rem] border-2 border-gray-300 bg-blue-500 rounded object-cover transition-all`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                
                <input type="file" onChange={handleProfileImageChange} name="profileImage" hidden id="profileImage" />
                <label htmlFor='profileImage'  className='text-7xl absolute top-8 left-12'>
                    
                     +
                  </label>
                  <button className='text-7xl absolute top-20 left-12'>
                     -
                  </button>
                </div>
            
           }
             {
               isEditable ? <input type="text" autoFocus = {isEditable} className='text-2xl border-1 border-gray-500 text-gray-600' value={userProfileDetails.username} onChange ={handleChange} name='username' /> : <h1 className='text-2xl'>{userProfileDetails.username}</h1>
             }
             <hr className='text-gray-300 border-1 border-gray-400 w-full' />

             <div className='contact-info flex flex-col items-start justify-center gap-5'>
                  <h3 className='text-xs text-gray-600 underline'>CONTACT INFOMATION</h3>
                    <div className='flex items-center gap-8'>
                    <p className=' text-xs text-gray-500'> Email Id : </p>
                    {
                       isEditable ? <input type="email" autoFocus = {isEditable} value={userProfileDetails.email} onChange={handleChange} className='text-xs text-gray-600' name='email' /> :
                      <span className=' text-xs text-gray-500 w-[15vw]'>{userProfileDetails.email}</span>

                    }
                    </div>
                    <div className='flex items-center gap-8'>
                    <p className=' text-xs text-gray-500'> Phone : </p>
                     {
                       isEditable ? <input type="text" name='phone' value={userProfileDetails.phone} onChange={handleChange} className='text-xs text-gray-600' /> :  <span className=' text-xs text-gray-500 w-[15vw]'>{userProfileDetails.phone}</span>
                     }
                    </div>
                    <div className='flex items-center gap-8'>
                    <p className=' text-xs text-gray-500'> Address : </p>
                    {
                       isEditable ? <input type="text" name='address' value={userProfileDetails.address} onChange={handleChange} className='text-xs text-gray-600'/> :  <span className=' text-xs text-gray-500 w-[15vw]'>{userProfileDetails.address}</span>
                     }
                    </div>
             </div>
             <hr className='text-gray-300 border-1 border-gray-400 w-full' />

             <div className='contact-info flex flex-col items-start justify-center gap-5'>
                  <h3 className='text-xs text-gray-600 underline'>BASIC INFOMATION</h3>
                    <div className='flex items-center gap-8'>
                    <p className=' text-xs text-gray-500'> Gender : </p>
                    {
                       isEditable ? <select name='gender' className='text-xs text-gray-600' onChange= {handleChange} value={userProfileDetails.gender}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                       </select> : 
                       <span className=' text-xs text-gray-500 w-[15vw]'>{userProfileDetails.gender}</span>
                    }
                    </div>
                    <div className='flex items-center gap-8'>
                    <p className=' text-xs text-gray-500'> DOB : </p>
                     {
                       isEditable ? <input type="date" onChange={handleChange} value={userProfileDetails.dob}name='dob' className='text-xs text-gray-600' /> : 
                       <span className=' text-xs text-gray-500 w-[15vw]'>{userProfileDetails?.dob?.split("T")[0]}</span>
                     }
                    </div>
                
             </div>

             {
               !isEditable ?   <Button onClick={() => setIsEditable(true)} className='bg-white hover:bg-blue-500 hover:border-none hover:text-white transition-all text-black text-xs rounded-full py-2 px-6 border-[1px] border-gray-400'>Edit</Button> :
               <Button onClick={handleSaveInfo} className='bg-white hover:bg-blue-500 hover:border-none hover:text-white transition-all  text-black text-xs rounded-full py-2 px-6 border-[1px] border-gray-400'>Save Infomation</Button>
             }
        </div>
    </div>
  )
}

export default Profile
