import jwt from "jsonwebtoken";
import User from "../models/User.js";



export const protectRoute = async (req, res, next)=>{
    try{
        const token = req.cookies.jwt;
        console.log("Token from cookies:", token);

        if (!token){
            return res.status(401).json({message:"unAuthorized - no token provided"})
        }

        const decoded =jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({message:"unAuthorized - invalid token"})
        }


        const user= await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({message:"unAuthorized - user not found"})
        }
         req.user = user;
         next()
    }
   
 catch(error){
   console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
 }
}