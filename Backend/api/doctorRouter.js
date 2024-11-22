import express from 'express'
import { fetchRelatedDoctors, getAllDoctorsList, getDoctorDashboardData, getLoggedInDoctorAppointment, getMyProfile, getSingleDoctorById, loginDoctor, markTheAppointmentCompleted, updateDoctorProfile } from '../Controllers/doctorController.js';
import { doctorAuthentication } from '../Middlewares/DoctorAuthentication.js';

const router = express.Router();

router.get("/allDoctorList" , getAllDoctorsList)
router.get("/getMyProfile" , doctorAuthentication , getMyProfile)
router.get("/singleDoctor/:doctorId" , getSingleDoctorById)
router.get("/relatedDoctor/:doctorId" , fetchRelatedDoctors)
router.post("/login" , loginDoctor)
router.get("/getMyAppointments" , doctorAuthentication , getLoggedInDoctorAppointment)
router.get("/getDashboardData" , doctorAuthentication , getDoctorDashboardData)
router.get("/markAppointmentCompletedById/:appointmentId" , doctorAuthentication , markTheAppointmentCompleted)
router.post("/updateDoctorProfile" , doctorAuthentication , updateDoctorProfile)
export default router;


