import { fetchAllDoctorsService } from "@/Services/Admin/AddingNewDoctorServices";
import { createContext, useEffect, useState } from "react";


const AdminContext = createContext()

export const AdminContextProvider = ({children}) =>{
    
     const [adminInfo , setAdminInfo] = useState(localStorage.getItem("adminAuthToken") ? true : false)
     const [allDoctors , setAllDoctors] = useState([])

  
  const fetchAllDoctors = async () =>{
    
      const response = await fetchAllDoctorsService ()

      if (response.data?.success) {
          setAllDoctors(response.data?.data)
      }
      else {
         console.log(response.data)
      }

  }

  useEffect(() =>{
    fetchAllDoctors()
  } , [adminInfo])



  
 

     return (
       <AdminContext.Provider value={{adminInfo , setAdminInfo , allDoctors , setAllDoctors , fetchAllDoctors}}>
        {children}
       </AdminContext.Provider>
     ) 
}

export default AdminContext
