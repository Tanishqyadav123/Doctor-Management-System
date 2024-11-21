import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cancelAppointmentByIdService } from "@/Services/Admin/AddingNewDoctorServices";
  import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
  
  
  
  export function AdminAppointmentListTable({ allAppointmentList , setAllAppointmentsList}) {



    const handleCancelAppointment = async(appointmentDetails) =>{
    
      try {
        
          const response = await cancelAppointmentByIdService(appointmentDetails._id)

          if (response.data.success) {
            
               const updatedAppointmentsList = await allAppointmentList.filter((elem ) =>{
                    if (elem._id.toString() != appointmentDetails._id.toString()) {
                         return elem;
                    }
               })

               setAllAppointmentsList(updatedAppointmentsList)
               toast.success(response.data.message)

          }

      }
      catch (error) {
         
         toast.error(error?.response?.data?.message)

      }
    

  }
    return (
      <Table className="mt-8 ">
        <TableCaption>A list of all the appointments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Fees</TableHead>
            <TableHead className="text-right ml-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppointmentList.map((appointmentDetails , index) => (
            <TableRow className="shadow-2xl" key={appointmentDetails._id}>
              <TableCell className="font-medium">{index+1}</TableCell>
              <TableCell className="text-sm font-medium" >{appointmentDetails.userData.username}</TableCell>
              <TableCell className="text-sm font-medium" >{appointmentDetails.slotTime} , {appointmentDetails.slotDate}</TableCell>
              <TableCell className="text-sm font-medium flex items-center gap-2" > <img src={appointmentDetails.docData.doctorImage} className="h-10 w-10 rounded-full object-cover" alt="" /> {appointmentDetails.docData.doctorName}</TableCell>
              <TableCell className="text-sm font-medium" >${appointmentDetails.amount}</TableCell>
              <TableCell className="text-sm font-medium" >{appointmentDetails.totalAmount}</TableCell>
              <TableCell className="mr-12 w-[10vw]"> <MdCancel onClick={() => handleCancelAppointment(appointmentDetails)} className = "text-xl text-red-500" /> </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        
        </TableFooter>
      </Table>
    )
  }
  