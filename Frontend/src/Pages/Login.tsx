import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/assets_frontend/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { loginUserService } from "@/Services/userServices";
import { UserContext } from "@/Context/userContext";
import { toast } from "react-toastify";


function Login() {

  const [userDetails , setUserDetails] = useState({})
  const navigate = useNavigate()

  const {isAuthUser , setIsAuthUser} = useContext(UserContext)

  const handleChange = (e) =>{
    
      setUserDetails({...userDetails  , [e.target.name] : e.target.value})

  }

  const handleSubmit = async (e) =>{
     e.preventDefault()
    
    try {
      const response = await loginUserService(userDetails)

      if (response.data.success) {
       setIsAuthUser(response.data.data)
       localStorage.setItem("userDetails" , JSON.stringify(response.data.data))
       toast.success(response.data.message)
       navigate("/")
      }
      else {
        console.log(response.data)
        toast.error("")
      }
    }
    catch (error) {
       toast.error(error?.response?.data?.message)
    }
     
  }

  useEffect(() =>{
     if (isAuthUser) {
      navigate("/")
     }
  } , [isAuthUser])
 
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img className="w-[10rem]  mr-2" src={logo} alt="logo" />

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-8">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 mt-5">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    forgot password?
                  </Link>
                </div>
                <Button 
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 "
                >
                  Sign In
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
