import { createContext, useState } from "react";

export const DoctorContext = createContext(null)


export const DoctorContextProvider = ({children}) =>{
    
    const [doctorInfo , setDoctorInfo] = useState(localStorage.getItem("doctorToken") ? localStorage.getItem("doctorToken") : "");

     return <DoctorContext.Provider value={{doctorInfo , setDoctorInfo}}>
        {children}
     </DoctorContext.Provider>

}

