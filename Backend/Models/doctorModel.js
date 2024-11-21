import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
const doctorSchema = new mongoose.Schema({
     doctorName : {
        type : String,
        required : true
     },
     doctorEmail : {
        type : String,
        required : true,
        unique : true
     },
     doctorPassword : {
        type : String,
        required : true
     },
     doctorImage : {
        type : String
     },
     doctorImage_publicId : {
        type : String
     },
     speciality : {
         type : String
     },
     degree : {
         type : String
     },
     experience : {
         type : String
     },
     about : {
         type : String
     },
     fees : {
         type : String
     },
     address : {
         type : String
     },
     dob : {
         type : Date
     },
     slots_booked : {
         type : Object,
         default : {}
     },
     gender : {
         type : String,
         enum : ["Male" , "Female"]
     },
     available : {
         type : Boolean,
         default : true
     }
} , {
    timestamps : true,
    minimize : false
})


doctorSchema.pre("save" , async function(next) {
    if (this.isModified("doctorPassword")) {
        this.doctorPassword = await bcryptjs.hash(this.doctorPassword , 10)
    }
    next();
})

doctorSchema.methods.comparePassword = async function(enteredPassword) {
    
     return await bcryptjs.compare(enteredPassword , this.doctorPassword)

}

export const doctorModel = mongoose.models.doctor || mongoose.model("doctor" , doctorSchema)
