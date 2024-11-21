import { Button } from "@/components/ui/button";
import React from "react";
import logoSvg from "../assets/assets_frontend/logo.svg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({ isAdminLoggedin  , setAdminInfo , doctorInfo , setDoctorInfo}) {
  const navigate = useNavigate();
  console.log(isAdminLoggedin)

  

  const handleLogout = () =>{
      if (isAdminLoggedin && localStorage.getItem("adminAuthToken")) {
        setAdminInfo (false)
        localStorage.removeItem("adminAuthToken")
        navigate("/")
      }

      if (doctorInfo && localStorage.getItem("doctorToken")) {
          setDoctorInfo(false);
          localStorage.removeItem("doctorToken")
          navigate("/")
      }



  }
  
  return (
    <div className="w-[80vw] h-[4rem] shadow-2xl p-1">
      <div className="container mx-[8rem]   flex items-center justify-between mt-2 font-semibold">
        <div>
          <img src={logoSvg} alt="" className="h-[1.7rem]" />
          <span className="text-[0.6rem] border-2 border-gray-400 p-[1px] px-4 rounded-full">
            {isAdminLoggedin && "Admin"}
            {doctorInfo && "Doctor"}
          </span>
        </div>

        {isAdminLoggedin || doctorInfo ? (
          <Button
            onClick={handleLogout}
            className="text-sm bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/")}
            className="text-sm bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
