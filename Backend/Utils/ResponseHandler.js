export const responseHandler = (res , statusCode , message , data) =>{
 
    statusCode =  statusCode || 200 
    return res.status(statusCode).json({
         success : true,
         message,
         data
    })
    
}

