import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cancelAppointmentByIdService } from "@/Services/Admin/AddingNewDoctorServices";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import { toast } from "react-toastify";
import { markTheAppointmentCompletedService } from "@/Services/Doctor/DoctorServices";

export function AllAppointmentsTable({
  allDoctorAppointment,
  setAllDoctorAppointment,
}) {


    const handleCancelAppointment = async(appointmentDetails) =>{
    
        try {
          
            const response = await cancelAppointmentByIdService(appointmentDetails._id)
  
            if (response.data.success) {
              
                 const updatedAppointmentsList = await allDoctorAppointment.filter((elem ) =>{
                      if (elem._id.toString() != appointmentDetails._id.toString()) {
                           return elem;
                      }
                 })
  
                 setAllDoctorAppointment(updatedAppointmentsList)
                 toast.success(response.data.message)
  
            }
  
        }
        catch (error) {
           
           toast.error(error?.response?.data?.message)
  
        }
      
  
    }

    const handleCompleteAppointment = async(appointmentDetails) =>{
        
          try {
            
              const response = await markTheAppointmentCompletedService(appointmentDetails._id)

              if (response.data.success){
                
                setAllDoctorAppointment(response.data.data)
                // toast.success(response.data.message)
                 console.log(response.data.message)

              }
              else {
                 console.log(response.data)
              }

          }
          catch (error) {
            
              toast.error(error?.response?.data?.message)

          }

    }

  return (
    <Table className="mt-8 w-max">
      <TableCaption>A list of all the appointments.</TableCaption>
      <TableHeader>
        <TableRow className="w-[70vw] flex  items-center justify-around">
          <TableHead className="">#</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Fees</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allDoctorAppointment.map((appointmentDetails, index) => (
          <TableRow
            className="shadow-2xl w-[70vw] flex items-center gap-20 justify-around ml-14"
            key={appointmentDetails._id}
          >
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="text-xs w-[10vw] font-medium flex items-center gap-2">
              <img
                src={appointmentDetails.userData.userImage}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
              {appointmentDetails.userData.username}
            </TableCell>
            <TableCell className="text-xs w-[10vw] font-medium">
              {appointmentDetails.isPaid ? (
                <span className="border-1 border-gray-500 rounded-full px-6 py-1 bg-green-400 text-white ">
                  Online
                </span>
              ) : (
                <span className="border-1 border-gray-500 rounded-full px-6 py-1 bg-blue-500 text-white">
                  Offline
                </span>
              )}
            </TableCell>
            <TableCell className="text-xs w-[10vw] font-medium flex items-center gap-2">
              {appointmentDetails.slotTime} , {appointmentDetails.slotDate}
            </TableCell>
            <TableCell className="text-xs w-[10vw] font-medium">
              ${appointmentDetails.amount}
            </TableCell>
            <TableCell className="mr-12 w-[10vw] ">
             {
                 appointmentDetails.isCompleted ? <span className="text-yellow-600 text-md font-semibold">Completed</span> : <div className="flex gap-4">
                     
              <MdCancel
                onClick={() => handleCancelAppointment(appointmentDetails)}
                className="text-xl text-red-500"
              />
              <IoIosCheckmarkCircleOutline className="text-xl text-green-500" onClick={() => handleCompleteAppointment(appointmentDetails)} />
                 </div>
             }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
