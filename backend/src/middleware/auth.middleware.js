import { BlacklistToken } from "../models/blacklist.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token || token.trim() === "") {
            throw new ApiError(401, "unauthorized access ")
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      
        const isTokenBlacklisted= await BlacklistToken.findOne({token})
         if(isTokenBlacklisted)
         {
              throw new ApiError(401, "Blacklisted token") 
         }


        // finding whether the user exist or not(user deleted from db)
        const user = await User.findById(decodedToken?.id)

        if (!user) {
            throw new ApiError(401, "Invalid Token ")
        }
        req.user = user;

        next()

    } catch (error) {
        throw new ApiError(401, error.message || "Invalid or expired token ")
    }

})