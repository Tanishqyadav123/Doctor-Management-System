import { Button } from "@/components/ui/button"
import { bookingSlotsArr, bookingSlotTimingArr } from "@/Constants"
import { bookAppointmentService } from "@/Services/userServices";
import {useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Define the interface for the slot type
interface TimeSlot {
  day: string;
  date: string;
  time: string;
}

const BookingSlots: React.FC = ({doctorDetails}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot , setSelectedTimeSlot] = useState<string>("")
  const [againFilteredData , setAgainFilteredData] = useState([])
  const {doctorId} = useParams()
  const navigate = useNavigate()
  


  const handleBookAppointment = async () =>{
    
     try {
      const response = await bookAppointmentService(selectedDate , selectedTimeSlot , doctorDetails._id , doctorDetails.fees)

      if (response.data.success) {
         toast(response.data.message)
         navigate("/my-appointments")
      }
      else {
         console.log(response.data)
      }
     }
     catch (error) {
       toast(error?.response?.data?.message)
     }



  }

  useEffect(() =>{
     setSelectedTimeSlot("")
     setSelectedDate("")
  } , [doctorId])
  
  console.log(selectedDate)
  console.log(selectedTimeSlot)

  console.log(doctorDetails.available)
  // Helper function to format a date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  };

  // Generate time slots (PM only, 30-minute intervals)
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 12; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute === 0 ? '00' : '30'} PM`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  // Generate the next 7 days with their date and time slots
  const generateSlots = (): TimeSlot[] => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const timeSlots = generateTimeSlots();
    const slots: TimeSlot[] = [];

    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + dayOffset);
      const formattedDate = formatDate(date);

      timeSlots.forEach((slot) => {
        // Parse the hour and minute from the slot
        const [time, meridian] = slot.split(' ');
        const [slotHour, slotMinute] = time.split(':').map(Number);
        const isPM = meridian === 'PM';
        const slot24Hour = isPM ? slotHour : slotHour % 12;

        if (
          dayOffset > 0 ||
          (slot24Hour > currentHour || (slot24Hour === currentHour && slotMinute > currentMinute))
        ) {
          slots.push({ day: formattedDate, date: date.toDateString(), time: slot });
        }
      });
    }

    return slots;
  };

  // Render all the next 7 days as clickable buttons
  const slots = generateSlots();
  const uniqueDates = [...new Set(slots.map((slot) => slot.date))];
  const filteredSlots = selectedDate
    ? slots.filter((slot) => slot.date === selectedDate)
    : [];


    useEffect(() =>{
      
        console.log(doctorDetails)

    })

  return (
    <div>
      <div className="flex items-center gap-5 my-5">
        {uniqueDates.map((date, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(date)}
            style={{
              padding: '10px',
              backgroundColor: selectedDate === date ? '#007BFF' : '#E0E0E0',
              color: selectedDate === date ? '#FFFFFF' : '#000000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {formatDate(new Date(date))}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 flex-wrap ">
        {filteredSlots.length > 0 ? (
          filteredSlots.map((slot, index) => {
             
                   
                    return !doctorDetails.slots_booked[selectedDate]?.includes(slot.time) && <div onClick={() => setSelectedTimeSlot(slot.time)} className={` ${selectedTimeSlot === slot.time ? "bg-blue-500  text-[#FFFFFF]" : "bg-[#E0E0E0] text-[#000000]"} py-2 px-4  hover:bg-blue-500 hover:text-white bg-white text-gray-600 transition-all cursor-pointer border-2 border-gray-300 rounded-full text-sm w-max`} key={index}>
                    {slot.time}
                  </div>
              
            })
        ) : (
          <p>Please select a date to see available slots.</p>
        )}
      </div>

    <div className="flex items-center justify-center mt-5">
    <Button disabled = {doctorDetails.available == true ? false : true} className=" text-center mt-5 rounded bg-blue-500 hover:bg-blue-600 " onClick={handleBookAppointment}>Book Appointment</Button>
    </div>
    </div>
  );
};

export default BookingSlots;

// export default BookingSlotComponent
