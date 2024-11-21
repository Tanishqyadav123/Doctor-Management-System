import { manageDoctorAvailability } from "@/Services/Admin/AddingNewDoctorServices";
import React, { useState } from "react";

function SingleDoctorCard({ doctorInfo , setAllDoctors , allDoctors }) {

    

    const handleChange = async() =>{
        const response = await manageDoctorAvailability(doctorInfo?._id)

        if (response.data?.success) {
             console.log("Doctor Updated SuccessFully")
             setAllDoctors(response?.data.data)
            
        }
        else {
             console.log(response.data)
        }

        

    }

  return (
    <div>
      <div className=" flex items-center justify-center flex-col w-[18rem] shadow-2xl bg-white border border-gray-200 rounded-lg hover:-translate-y-5 transition-all dark:bg-gray-800 dark:border-gray-700 mt-4">
        <img
          className="rounded-t-lg h-[13rem] w-[14rem] object-cover"
          src={doctorInfo?.doctorImage}
          alt=""
        />

        <div className="p-5">
          <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
            {doctorInfo.doctorName}
          </h5>

          <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
            {doctorInfo.speciality}
          </p>

          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox"  checked = {doctorInfo.available} onChange = {handleChange} value="" className="sr-only peer text-xs" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-500 after:border-gray-500 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className={`  ms-3 text-sm font-medium ${doctorInfo.available ? "text-green-500" : "text-red-500"} dark:text-gray-300`}>
              {
                doctorInfo.available ? "Available" : "Not Available"
              }
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default SingleDoctorCard;
