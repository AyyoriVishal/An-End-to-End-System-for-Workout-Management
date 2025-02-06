import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async(req,res,next) =>{ 
    try {

        //console.log("reqbody jwt",req.body)
        //console.log("cookies in middleware" , req.cookies)
        //console.log("reqcookiesaccesss : ",req.cookies.accessToken)

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        
        // console.log("token : ",token)

        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        // console.log("decodedtoken : ",decodedToken)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        // console.log("user : ",user)

        if(!user){
            throw new ApiError(401,"Invalid Access token")
        }
    
        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid ACcess token")
    }
})


export const authorizeRoles = (roles) => {
    return asyncHandler(async (req, res, next) => {
        //console.log("auth role madhla ",req.user)
        //console.log("Role of performer",roles)
        //console.log("condition auth role vala",roles.includes(req.user.role))
        if (!roles.includes(req.user.role)) {
            throw new ApiError(401, `You Don't have rights to perform operation`);
        }
        next();
    });
};
