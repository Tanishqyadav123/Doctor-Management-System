import express from "express"
import { addNewDoctor, cancelAppointmentById, getAdminDashboardData, getAllAppointments, getAllDoctors, loginAdmin, manageDoctorAvailability } from "../Controllers/adminController.js"
import { upload } from "../Middlewares/Multer.js"
import { adminAuthentication } from "../Middlewares/AdminAuthentication.js"

const router = express.Router()

router.post("/adminLogin" , loginAdmin)
router.post("/addDoctor" , adminAuthentication ,upload.single("image") ,addNewDoctor)
router.get("/getAllDoctors" , adminAuthentication ,getAllDoctors )
router.get("/manageDoctorAvailability/:docId" , adminAuthentication ,manageDoctorAvailability )
router.get('/getAllAppointments' , adminAuthentication , getAllAppointments)
router.delete("/cancelAppointmentById/:appointmentId" , adminAuthentication , cancelAppointmentById)
router.get("/getAdminDashboardData" , adminAuthentication , getAdminDashboardData) 
export default router