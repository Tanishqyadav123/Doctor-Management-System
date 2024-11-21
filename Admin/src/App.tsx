import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { lazy, Suspense, useContext } from 'react'
import AdminContext from './Context/adminContext'
import PrivateRouter from './PrivateRouter/PrivateRouter'
import SideBar from './MyComponents/SideBar'
import { DoctorContext } from './Context/doctorContext'
function App() {


  const Navbar = lazy(() => import ("./MyComponents/Navbar"))
  const LoginPage = lazy(() => import("./Pages/Login"))
  const AdminDashboard = lazy(() => import("./Pages/AdminDashBoard"))
  const AddDoctor = lazy(() => import("./Pages/AddDoctor"))
  const Appointments = lazy(() => import("./Pages/Appointments"))
  const DoctorList = lazy(() => import("./Pages/DoctorList"))

  //  Doctor Routes Path:-
   const DocDashBoard = lazy(() => import ("./Pages/DoctorPage/DoctorDashBoard"))
   const DocAppointment = lazy(() => import ("./Pages/DoctorPage/DoctorAppointment"))
   const DocProfile = lazy(() => import ("./Pages/DoctorPage/DoctorProfile"))

  const {adminInfo , setAdminInfo} = useContext(AdminContext)
  const {doctorInfo , setDoctorInfo} = useContext(DoctorContext)
 
 console.log(adminInfo)
 console.log("doctror Info " , doctorInfo)


  return (
     <>
      <Router>
        <Suspense fallback = {<>Loading...</>}>
        <Navbar isAdminLoggedin = {adminInfo} setAdminInfo = {setAdminInfo} doctorInfo = {doctorInfo} setDoctorInfo = {setDoctorInfo}/>
       
        <Routes>
       {/* Admin Routes */}
          <Route element = {<PrivateRouter />} >
          <Route path='/dashboard' element = {<AdminDashboard />} />
          <Route path='/all-appointments' element = {<Appointments />} />
          <Route path='/add-doctor' element = {<AddDoctor />} />
          <Route path='/doctor-list' element = {<DoctorList />} />
          </Route>
          

        {/*  Doctor Routes */}
           <Route path='/docDashBoard' element = {<DocDashBoard />} />
           <Route path='/docProfile' element = {<DocProfile />} />
           <Route path='/docAppointment' element = {<DocAppointment />} />

          {/* Login Page Route */}
           <Route path='/' element = {<LoginPage />} />

        </Routes>

         
        </Suspense>
      </Router>
     </>
  )
}

export default App
