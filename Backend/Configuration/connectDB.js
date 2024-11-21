import mongoose from 'mongoose'

export const connectDB = async() =>{
 
     try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`) 
        
        console.log("Database Connected SuccessFully :" , conn.connection.host)
     }
     catch (error) {
          throw new Error(error)
     }

}
