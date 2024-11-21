import SideBar from "@/MyComponents/SideBar";
import React, { useState } from "react";
import uploadArea from '../assets/assets_admin/upload_area.svg'
import { addingNewDoctorService } from "@/Services/Admin/AddingNewDoctorServices";
import { useNavigate } from "react-router-dom";
function AddDoctor() {

  const navigate = useNavigate()
  const [doctorDetails , setDoctorDetails] = useState({
       doctorName : "",
       doctorEmail : "",
       doctorPassword : "",
       experience : "",
       fees : "",
       speciality : "",
       degree : "",
       address : "",
       dob : "",
       gender : "",
       about : ""
  })
  const [doctorImage , setDoctorImage] = useState(null)

  const handleChange = (e) =>{
      console.log(e.target.name , e.target.value)
      setDoctorDetails({...doctorDetails , [e.target.name] : e.target.value})
  }
  const handleFileChange = (e) =>{
    setDoctorImage(e.target.files[0])
  }

  const handleFormSubmit = async (e) => {
    
      e.preventDefault()
      const doctorFormData = new FormData()
      doctorFormData.append("image" , doctorImage)

      //  Appending all the details of doctorDetails in doctorFormData :-
      Object.keys(doctorDetails).forEach((key) => {
           const value = doctorDetails[key];
    
          doctorFormData.append(key, value);
        
      });

      //  Call for the addDoctorService to add new doctor :-
      const response = await addingNewDoctorService(doctorFormData)
      if (response.data?.success) {
          console.log(response.data.data)
          navigate ("/dashboard")
      }
      else {
         console.log(response.data)
      }

  }

  return (
    <div className="flex relative ">
      <SideBar />
      <div className="px-8 py-4">
        <h1 className="text-sm uppercase text-gray-700 mb-12">Add Doctor</h1>
        <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
              name="doctorName"
              id="floating_email"
              hidden = {true}
              placeholder=" "
              required
              onChange={handleFileChange}
            />
            <label
              htmlFor="floating_email">
             <img src={uploadArea} alt="" className=" relative h-[10rem] border-2 border-400 rounded-full" />
                <p className="text-3xl absolute top-20 left-24 text-blue-500">+</p>
                <p className=" absolute bottom-3 left-12 text-sm text-gray-600" >{doctorImage ? "Uploaded" : "Upload Image"}</p>
            </label>
          </div>
     <div className=" absolute top-[5rem] left-[35rem]">
         
    
        <form onSubmit={handleFormSubmit} className=" mx-auto flex items-start justify-center flex-col gap-8">
          <div className="flex items-center justify-center gap-16">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="doctorName"
              id="floating_email"
              className=" w-[20vw] block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              DoctorName
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="speciality"
              id="floating_email"
              className="  w-[20vw] block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Speciality
            </label>
          </div>
          </div>
          <div className="flex items-center justify-center gap-16">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="doctorEmail"
              id="floating_password"
              className="  w-[20vw] block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              DoctorEmail
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="degree"
              id="floating_repeat_password"
              className="  w-[20vw] block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label
              htmlFor="floating_repeat_password"
              className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
             Degree
            </label>
          </div>
          </div>
          
          <div className="flex items-center justify-center gap-16">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="doctorPassword"
              id="floating_password"
              className="  w-[20vw] block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              DoctorPassword
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="address"
              id="floating_repeat_password"
              className=" w-[20vw] block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>
          </div>
          
  
          <div className="flex items-center justify-center gap-16">
          <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                
                name="experience"
                id="floating_phone"
                className="block py-2.5 px-0 w-[20vw] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label
                htmlFor="floating_phone"
                className=" w-32 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
               Experience
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                
                name="dob"
                id="floating_phone"
                className="block py-2.5 px-0 w-[20vw] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label
                htmlFor="floating_phone"
                className=" w-32 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
               DOB
              </label>
            </div>
          </div>
            <div className="flex items-center justify-center gap-16">
            <div className="relative z-0 w-full mb-1 group">
              <input
                type="text"
                name="fees"
                id="floating_company"
                className="block py-2.5 px-0 w-[20vw] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}

              />
              <label
                htmlFor="floating_company"
                className=" w-32 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Fees
              </label>
            </div>
            <div className="relative z-0 w-full mb-1 group">
              <h1 className="w-32 peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">Gender</h1>
              <div className="flex mt-5">
              <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input checked = {doctorDetails.gender == "Male"} id="gender" type="radio" value="Male" name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleChange} />
                    <label htmlFor="gender" className="w-full py-4 ms-2 text-xs font-medium text-gray-600 dark:text-gray-300">Male</label>
                </div>
                <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input checked = {doctorDetails.gender == "Female"} id="gender" type="radio" value="Female" name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={handleChange} />
                    <label htmlFor="gender" className="w-full py-4 ms-2 text-xs font-medium text-gray-600 dark:text-gray-300">Female</label>
                </div>
              </div>

             
            </div>
            </div>
            <div className="relative z-0 w-full mb-1 group">
            
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</label>
            <textarea onChange={handleChange} id="message" rows={4} name="about" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

            </div>
          
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default AddDoctor;
