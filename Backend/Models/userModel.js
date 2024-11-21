import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
     username : {
         type : String,
         required : true
     },
     email : {
         type : String,
         required : true
     },
     password : {
         type : String,
         required : true
     },
     userImage : {
         type : String,
         default : "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg"
     },
     userImage_PublicId : {
         type : String
     },
     address : {
         type : String
     },
     gender : {
         type : String,
         enum : ["Male" , "Female"]
     },
     phone : {
         type : String
     },
     dob : {
         type : Date
     }

} , {
    timestamps : true
})

userSchema.pre("save" , async function (next) {
    
    if (this.isModified("password")) {
         this.password = await bcrypt.hash(this.password , 10)
    }
    next();

})
userSchema.methods.ComparePassword = async function(enteredPassword) {
    
    const isMatch = await bcrypt.compare(enteredPassword , this.password)
    return isMatch;

}
export const userModel = mongoose.models.user || mongoose.model("user" , userSchema)

