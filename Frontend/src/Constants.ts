import GeneralPhysicianImage from './assets/assets_frontend/General_physician.svg'
import GynecologistImage from './assets/assets_frontend/Gynecologist.svg'
import DermatologistImage from './assets/assets_frontend/Dermatologist.svg'
import PediatriciansImage from './assets/assets_frontend/Pediatricians.svg'
import NeurologistImage from './assets/assets_frontend/Neurologist.svg'
import GastroenterologistImage from './assets/assets_frontend/Gastroenterologist.svg'
import doc1 from './assets/assets_frontend/doc1.png'
import doc2 from './assets/assets_frontend/doc2.png'
import doc3 from './assets/assets_frontend/doc3.png'
import doc4 from './assets/assets_frontend/doc4.png'
import doc5 from './assets/assets_frontend/doc5.png'
import doc6 from './assets/assets_frontend/doc6.png'
import doc7 from './assets/assets_frontend/doc7.png'
import doc8 from './assets/assets_frontend/doc8.png'
import doc9 from './assets/assets_frontend/doc9.png'
import doc10 from './assets/assets_frontend/doc10.png'
import { appointmentDataType, bookingSLotObjType, SpecialityType } from './Types'



export const SpecialityArr : SpecialityType = [
  {
    name: "General Physician",
    imageName : GeneralPhysicianImage
  },
  {
    name: "Gynecologist",
    imageName : GynecologistImage
  },
  {
    name: "Dermotologist",
    imageName : DermatologistImage
  },
  {
    name: "Pediatricians",
    imageName : PediatriciansImage
  },
  {
    name: "Neurologist",
    imageName : NeurologistImage
  },
  {
    name: "Gastroenterologist",
    imageName : GastroenterologistImage
  },
];

export const topDoctorSArr  = [
       {
         image_url : doc1,
         name : "Dr. Richard James",
         isAvailable : true,
         specailization : "General Physician"
       },
       {
         image_url : doc2,
         name : "Dr. Emily Larson",
         isAvailable : true,
         specailization : "Gynecologist"
       },
       {
         image_url : doc3,
         name : "Dr. Sarah Patel",
         isAvailable : true,
         specailization : "Dermotologist"
       },
       {
         image_url : doc4,
         name : "Dr. Chirstopher Lee",
         isAvailable : true,
         specailization : "Pediatricians"
       },
       {
         image_url : doc5,
         name : "Dr. Jennifer Garcia",
         isAvailable : true,
         specailization : "Neurologist"
       },
       {
         image_url : doc6,
         name : "Dr. Andrew Williams",
         isAvailable : true,
         specailization : "Gastroenterologist"
       },
       {
         image_url : doc7,
         name : "Dr. Chirstopher Davis",
         isAvailable : true,
         specailization : "General Physician"
       },
       {
         image_url : doc8,
         name : "Dr. Timothy White",
         isAvailable : true,
         specailization : "Gynecologist"
       },
       {
         image_url : doc9,
         name : "Dr. Ava Mitchell",
         isAvailable : true,
         specailization : "Dermotologist"
       },
       {
         image_url : doc10,
         name : "Dr. Jeffrey King",
         isAvailable : true,
         specailization : "Pediatricians"
       },
]


export const doctorSpecificationArr : string[] = ["General Physician" , "Gynecologist" , "Dermatologist"  , "Pediatricians" , "Neurologist" , "Gastroenterologist"]

export const bookingSlotsArr : bookingSLotObjType[] = [

     {
       Day : "WED",
       Date : 6
     },
     {
       Day : "THUR",
       Date : 7
     },
     {
       Day : "FRI",
       Date : 8
     },
     {
       Day : "SAT",
       Date : 9
     },
     {
       Day : "SUN",
       Date : 10
     },
     {
       Day : "MON",
       Date : 11
     },
     {
       Day : "TUE",
       Date : 12
     }

]

export const bookingSlotTimingArr : string[] = [
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",

]

export const relatedDoctorArr : [] = [
  {
    image_url : doc1,
    name : "Dr. Richard James",
    isAvailable : true,
    specailization : "General Physician"
  },
  {
    image_url : doc2,
    name : "Dr. Emily Larson",
    isAvailable : true,
    specailization : "Gynecologist"
  },
  {
    image_url : doc2,
    name : "Dr. Emily Larson",
    isAvailable : true,
    specailization : "Gynecologist"
  },
  {
    image_url : doc2,
    name : "Dr. Emily Larson",
    isAvailable : true,
    specailization : "Gynecologist"
  },
  {
    image_url : doc2,
    name : "Dr. Emily Larson",
    isAvailable : true,
    specailization : "Gynecologist"
  },
  {
    image_url : doc2,
    name : "Dr. Emily Larson",
    isAvailable : true,
    specailization : "Gynecologist"
  },
  {
    image_url : doc2,
    name : "Dr. Emily Larson",
    isAvailable : true,
    specailization : "Gynecologist"
  },
  {
    image_url : doc2,
    name : "Dr. Emily Larson",
    isAvailable : true,
    specailization : "Gynecologist"
  },
  {
    image_url : doc2,
    name : "Dr. Emily Larson",
    isAvailable : true,
    specailization : "Gynecologist"
  },
  {
    image_url : doc2,
    name : "Dr. Emily Larson",
    isAvailable : true,
    specailization : "Gynecologist"
  },
  {
    image_url : doc2,
    name : "Dr. Emily Larson",
    isAvailable : true,
    specailization : "Gynecologist"
  },

]


export const myAppointmentsData : appointmentDataType[] = [

   {
    doctorImage : doc1,
    doctorName : "Dr. Richard James",
    specification : "General Physician",
    address : "1239-Dwarkapuri , indore (M.P.)",
    date : "2003-05-16",
    time : "08:30PM"
   },
   {
    doctorImage : doc1,
    doctorName : "Dr. Richard James",
    specification : "General Physician",
    address : "1239-Dwarkapuri , indore (M.P.)",
    date : "2003-05-16",
    time : "08:30PM"
   },
   {
    doctorImage : doc1,
    doctorName : "Dr. Richard James",
    specification : "General Physician",
    address : "1239-Dwarkapuri , indore (M.P.)",
    date : "2003-05-16",
    time : "08:30PM"
   },
   {
    doctorImage : doc1,
    doctorName : "Dr. Richard James",
    specification : "General Physician",
    address : "1239-Dwarkapuri , indore (M.P.)",
    date : "2003-05-16",
    time : "08:30PM"
   },
   
  
]

export const BACKEND_URL = "https://doctor-management-system-pd7y.vercel.app/api/v1/doctor"
export const RAZORPAY_KEY_ID = "rzp_test_Aj1F2Vj9lNe3L0"
