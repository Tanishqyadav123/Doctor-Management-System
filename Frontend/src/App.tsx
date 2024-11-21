import { lazy, Suspense } from "react"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Navbar from "./MyComponents/Navbar"
import FooterComponent from "./MyComponents/FooterComponent"
import Login from "./Pages/Login"
import Register from "./Pages/Register"

function App() {

  const Home = lazy(() => import("./Pages/Home"))
  const AllDoctors = lazy(() => import("./Pages/AllDoctors"))
  const DoctorAppointment = lazy(() => import("./Pages/DoctorAppointment"))
  const ProfilePage = lazy(() => import ("./Pages/Profile"))
  const MyAppointments = lazy(() => import ("./Pages/MyAppointments"))
  return (
   <>
     <Router>
        <Navbar />
         <Suspense fallback = {<>Loading...</>}>
         <Routes>
 
            <Route path="/" element = {<Home />} />
            <Route path="/allDoctors" element = {<AllDoctors />} />
            <Route path="/doctor/:specificationName" element = {<AllDoctors />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/register" element = {<Register />} />
            <Route path="/appointment/:doctorId" element = {<DoctorAppointment />} />
            <Route path="/my-profile" element = {<ProfilePage />} />
            <Route path="/my-appointments" element = {<MyAppointments />} />

          
         </Routes>
         </Suspense>
     </Router>
   </>
  )
}

export default App
