import mongoose  from "mongoose";

const appointmentSchema = new mongoose.Schema({
    
    userId : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "user"
    },
    docId : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "doctor"
    },
    slotDate : {
         type : String,
         required : true
    },
    slotTime : {
         type : String,
         required : true
    },
    userData : {
         type : Object,
         required : true
    },
    docData : {
         type : Object,
         required : true
    },
    amount : {
         type : Number,
         required : true
    },
    isPaid : {
         type : Boolean,
         default : false
    },
    isCancelled : {
         type : Boolean,
         default : false
    },
    isCompleted : {
         type : Boolean,
         default : false
    },


} , {timestamps : true})



export const appointmentModel = mongoose.models.appointment || mongoose.model("appointment" , appointmentSchema)