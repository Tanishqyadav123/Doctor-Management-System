export const errorHandler = (res , statusCode , message ) =>{
 
    statusCode =  statusCode || 400 
    return res.status(statusCode).json({
         success : false,
         message  
    })
    
}

