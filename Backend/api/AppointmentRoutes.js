import express from "express"
import { bookAnAppointment, getAllMyAppointment } from "../Controllers/AppointmentController.js";
import { userAuthentication } from "../Middlewares/UserAuthentication.js";
import { cancelAppointmentById } from "../Controllers/userController.js";

const router = express.Router()

router.post("/bookAnAppointment" , userAuthentication ,bookAnAppointment)
router.get("/getMyAppointments" , userAuthentication , getAllMyAppointment)
router.delete("/cancelAppointmentById/:appointmentId" , userAuthentication , cancelAppointmentById)

export default router;
