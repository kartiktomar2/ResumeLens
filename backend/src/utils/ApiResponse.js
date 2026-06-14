
class ApiResponse{
           constructor(message, statusCode,data)
           {
               this.message=message,
               this.statusCode=statusCode,
               this.data=data,
               this.sucess=true
           }
}



export {ApiResponse}