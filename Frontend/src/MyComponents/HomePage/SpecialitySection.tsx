import { SpecialityArr } from "@/Constants"
import SingleSpecialityIcon from "./SingleSpecialityIcon"

function SpecialitySection() {

    

  return (
    <div className="mx-[10rem] my-[5rem] flex flex-col items-center justify-center gap-4 ">
      <h1 className="text-2xl font-[500] text-center">Find By Speciality</h1>
      <p className="w-[30vw] text-center text-xs">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate ut, adipisci porro est quasi rerum.</p>

      <div className="specialityCards flex items-center justify-center gap-8">
           {
             SpecialityArr.map((elem , index) =>{
                  return <SingleSpecialityIcon elem = {elem} key={index} />
             })
           }
      </div>

    </div>
  )
}

export default SpecialitySection
