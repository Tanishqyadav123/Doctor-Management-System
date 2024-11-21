import { createContext, useState } from "react";

export const DoctorContext = createContext()


 const DoctorContextProvider = ({children}) =>{
    
    const [allDoctors , setAllDoctors] = useState([])
    return <DoctorContext.Provider value={{allDoctors , setAllDoctors}}>{children}</DoctorContext.Provider>

}

export default DoctorContextProvider



