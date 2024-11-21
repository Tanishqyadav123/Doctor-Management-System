import FooterComponent from "@/MyComponents/FooterComponent"
import AppointmentSection from "@/MyComponents/HomePage/AppointmentSection"
import HeroSection from "@/MyComponents/HomePage/HeroSection"
import SpecialitySection from "@/MyComponents/HomePage/SpecialitySection"
import TopDoctorsList from "@/MyComponents/HomePage/TopDoctorsList"

function Home() {
  return (
    <div className="flex  items-center justify-center flex-col">
       <HeroSection />
       <SpecialitySection />
       <TopDoctorsList />
       <AppointmentSection />
       <FooterComponent />

    </div>
  )
}

export default Home
