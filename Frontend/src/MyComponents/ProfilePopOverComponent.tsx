import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UserContext } from "@/Context/userContext"
import { logoutUserService } from "@/Services/userServices"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

export function ProfilePopOver() {
    const {isAuthUser , setIsAuthUser} = useContext(UserContext)
    const navigate = useNavigate()

    console.log(isAuthUser)
    const handleLogout = async () =>{
         
      console.log("object")
        const response = await logoutUserService ()
    
         if (response.data.success) {
          
            
         setIsAuthUser(null)
         localStorage.removeItem("userDetails")
         navigate("/login") 
    
         }
         else {
           console.log(response.data)
         }
    
      }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <img src={isAuthUser.userImage} alt="" className="h-12 w-12 object-cover rounded-full" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          
          <div className="grid gap-5">
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm w-[10vw] cursor-pointer" onClick={() => navigate("/my-profile")} >My Profile</p>
             
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-sm w-[10vw] cursor-pointer" onClick={() => navigate("my-appointments")} >My Appointments</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-sm w-[10vw] cursor-pointer" onClick={handleLogout} >Logout</p>
            </div>
          
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
