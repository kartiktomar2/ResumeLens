const asyncHandler= (routeHandler)=> {
        return (req,res,next)=>{
             Promise.resolve(routeHandler(req,res,next)).catch(err=>next(err))
        }
}

export {asyncHandler}