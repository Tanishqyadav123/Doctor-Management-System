import {v2 as cloudinary} from 'cloudinary'

(async()=>{
     console.log("Cofiguring the cloudinary")
    await cloudinary.config({
        cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret : process.env.CLOUDINARY_API_SECRET,
   })
})()

export const uploadToCloudinary = async(filePath) =>{
    
    try {
         const response = await cloudinary.uploader.upload(filePath , {resource_type : "image"})
         if (!response.public_id) {
             return null;
         }

         return response
    }
    catch (error) {
         throw new Error (error)
    }

    
}

export const deleteFromCloudinary = async(publicId) =>{
     try {
        
        const response = await cloudinary.uploader.destroy(publicId , {resource_type : "image"} , (error , result) =>{
               if (error) {
                 throw new Error(error)
               }
               return result;
        })

        return response;

     } catch (error) {
        throw new Error (error)
     }
}