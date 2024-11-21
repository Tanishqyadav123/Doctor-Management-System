import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import logo from "../assets/assets_frontend/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AdminContext from "@/Context/adminContext";
import axios from "axios";
import { BACKEND_URL } from "@/Constants";
import { DoctorContext } from "@/Context/doctorContext";
import { toast } from "react-toastify";
import { doctorLoginService } from "@/Services/Doctor/DoctorServices";
function Login() {

    const {adminInfo , setAdminInfo} = useContext(AdminContext)
    const {doctorInfo , setDoctorInfo} = useContext(DoctorContext)
    const [isAdminLogin , setIsAdminLogin] = useState(true)
   

    const navigate = useNavigate()
   
    const [adminDetails , setAdminDetails] = useState<{adminEmail : string , adminPassword : string}>({
        adminEmail : "",
        adminPassword : ""
    })

    const [doctorDetails , setDoctorDetails] = useState<{doctorEmail : string , doctorPassword : string}>({
        doctorEmail : "",
        doctorPassword : ""
    })
    

    const handleChange = (e) =>{
         if (isAdminLogin) {
          setAdminDetails({...adminDetails , [e.target.name] : e.target.value})
         }
         else {
            setDoctorDetails({...doctorDetails , [e.target.name] : e.target.value})
         }
    }
    const handleSubmit = async (e : SubmitEvent) =>{
        e.preventDefault()
        if (isAdminLogin){
          const response = await axios.post(`${BACKEND_URL}/admin/adminLogin` , adminDetails , {withCredentials : true})

          if (response.data?.success) {
               setAdminInfo(true)
               localStorage.setItem("adminAuthToken" , response?.data?.data.adminAuthToken)
               console.log(response?.data?.data.adminAuthToken)
               navigate("/dashboard")
  
          }
          else {
               setAdminInfo(false)
          }
        }
        else {
            // TODO :-  Doctor Login Logic
            
             try {
              
                const response = await doctorLoginService(doctorDetails)

                if (response.data.success) {
                    
                  setDoctorInfo(true);
                  localStorage.setItem("doctorToken" , response.data.data.doctorToken)
                  toast(response.data.message)
                  navigate("/docDashBoard")


                }
                else {
                   console.log(response.data)
                }

             }
             catch (error)  {
                toast.error(error?.response?.data?.message)
             }

        }
    }

    useEffect(() =>{
      if (adminInfo) {
        console.log("object")
        navigate("/dashboard")
      }
      if (doctorInfo) {
          navigate("/docDashBoard")
      }
    } , [])

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-8">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 mt-5">
             
              {
                 isAdminLogin ? <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                 <div>
                   <label
                     htmlFor="email"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                   >
                     Admin email
                   </label>
                   <input
                     type="email"
                     name="adminEmail"
                     id="email"
                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="name@company.com"
                     onChange={handleChange}
                   />
                 </div>
                 <div>
                   <label
                     htmlFor="password"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                   >
                     Admin Password
                   </label>
                   <input
                     type="password"
                     name="adminPassword"
                     id="password"
                     placeholder="••••••••"
                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     onChange={handleChange}
                   />
                 </div>
               
                 <Button 
                   type="submit"
                   className="w-full text-white bg-blue-500 hover:bg-blue-600 "
                 >
                   Sign In
                 </Button>
                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                   Doctor Login?{" "}
                   <p
                     onClick={() => setIsAdminLogin(false)}
                     className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                   >
                     Click Here
                   </p>
                 </p>
               </form> : 
                 <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                 <div>
                   <label
                     htmlFor="email"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                   >
                     Doctor Email
                   </label>
                   <input
                     type="email"
                     name="doctorEmail"
                     id="email"
                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="name@company.com"
                     onChange={handleChange}
                   />
                 </div>
                 <div>
                   <label
                     htmlFor="password"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                   >
                     Doctor Password
                   </label>
                   <input
                     type="password"
                     name="doctorPassword"
                     id="password"
                     placeholder="••••••••"
                     className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     onChange={handleChange}
                   />
                 </div>
               
                 <Button 
                   type="submit"
                   className="w-full text-white bg-blue-500 hover:bg-blue-600 "
                 >
                   Sign In
                 </Button>
                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                   Admin Login?{" "}
                   <p
                     onClick={() => setIsAdminLogin(true)}
                     className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                   >
                     Click Here
                   </p>
                 </p>
               </form>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
