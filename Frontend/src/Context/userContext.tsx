import {createContext, useState} from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({children}) =>{
    
    const [isAuthUser , setIsAuthUser] = useState(localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null)

    return <UserContext.Provider value={{isAuthUser , setIsAuthUser}}>{children}</UserContext.Provider>

}


