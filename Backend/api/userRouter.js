import express from 'express'
import { getMyProfile, loginUser, logoutUser, paymentThroughRazorPay, registerUser, updateUserDetails, verifyRazorPayment } from '../Controllers/userController.js'
import { userAuthentication } from '../Middlewares/UserAuthentication.js'
import {upload} from '../Middlewares/Multer.js'

const router = express.Router()

router.post("/createNewUser" , registerUser)
router.post("/loginUser" , loginUser)
router.get("/logoutUser" , userAuthentication ,logoutUser)
router.get("/getMyProfile" , userAuthentication , getMyProfile)
router.put("/updateUserProfile" , userAuthentication , upload.single("profileImage") , updateUserDetails)
router.post("/paymentThroughRazorPay" , userAuthentication , paymentThroughRazorPay)
router.post("/verifyRazorPayment" , userAuthentication , verifyRazorPayment)

export default router