import React, { useEffect, useState } from "react";
import verifiedIcon from '../../assets/assets_frontend/verified_icon.svg'
import { IoInformationCircle } from "react-icons/io5";;
function DoctorDetailsSection({doctorDetails}) {


  return (
    <div className="w-[60vw] border-2 rounded-lg border-gray-300 h-[20rem] flex items-start justify-start p-2 flex-col gap-6">
      <div className="doc-name flex items-start justify-center flex-col gap-2">
            <h1 className="text-3xl text-gray-600 font-semibold flex items-center justify-center gap-3"> {doctorDetails?.doctorName} <img src={verifiedIcon} alt="" /> </h1>
            <div className="specialization-experience flex items-center justify-start gap-4">
                <h2 className="text-md">{doctorDetails?.speciality}</h2>
                <p className="text-sm">{doctorDetails?.experience}</p>
            </div>
      </div>
      <div className="about">
            <p className="font-semibold flex items-center justify-start gap-2">About <IoInformationCircle size={"0.9rem"} /></p>
            <p className="text-gray-600">{doctorDetails?.about}</p>
      </div>
      <div className="appointment-fees">
           <h1 className="text-lg">Appointment Fees : <span className="font-bold">${doctorDetails?.fees}</span> </h1>

      </div>
    </div>
  );
}

export default DoctorDetailsSection;
