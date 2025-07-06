import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"


// for signup, if there is one missing then all fields required, if the length of password is less than 6 then must be 6 or more character, if there is half gmail mention like without .com or .in etc then invalid format, if there is already email then try with another email
export async function signup(req, res){
    const {email,password, fullName}=req.body;

    try{
        if(!email || !password || !fullName){
            return res.status(400).json({message:"All fields are required"})
        }

        if(password.length<6){
            return res.status(400).json({message: "Password must be atleat 6 characters"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser= await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"Email already exists, please use a different one"})
    }


    const idx = Math.floor(Math.random()*100)+1;  //generate a random number btw 1 to 100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
        email, 
        fullName,
        password,
        profilePic: randomAvatar,
    })
    
   try{
     await upsertStreamUser({
        id: newUser._id.toString(),
        name:newUser.fullName,
        image: newUser.profilePic || "",
    })
console.log(`stream user created for ${newUser.fullName}`)


   }catch(error){
    console.log("Error creating a stream user:", error)
   }




    const token =jwt.sign({userid:newUser._id}, process.env.JWT_SECRET_KEY, {
        expiresIn : "7d"
    })
    res.cookie("jwt", token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true, //it prevents xss attacks
        sameSite: "strict", //prevetn csrf attack
        secure: process.env.NODE.ENV === "production"
    })

    res.status(201).json({success:true, user:newUser})
    }
    
    catch (error){
        console.log("error in signup controller", error)
        res.status(500).json({message:"internal server error"})

    }
}


//for login

export async function login(req, res){
   try{
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid email or password"})
    }
const isPasswordCorrect = await user.matchPassword(password);
if(!isPasswordCorrect){
    return res.status(400).json({message:"Invalid email or password"})
}
  const token =jwt.sign({userid:User._id}, process.env.JWT_SECRET_KEY, {
        expiresIn : "7d"
    })
    res.cookie("jwt", token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true, //it prevents xss attacks
        sameSite: "strict", //prevetn csrf attack
        secure: process.env.NODE.ENV === "production"
    })
res.status(200).json({success:true, user})
 

   }catch(error){
    console.log("error in login controller", error)
    res.status(500).json({message:"internal server error"})
    
   }
}


//for logout

export async function logout(req, res){
  res.clearCookie("jwt")
  res.status(200).json({success:true, message:"Logged out successfully"})
}

//for onboarding
export async function onboard(req, res){
   try{
    const userId= req.user._id;
    const {fullName, bio, nativeLanguage, learningLanguage, location}= req.body;

    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
  return res.status(400).json({message:"All fields are required",
    missingFields:[
        !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
    ].filter(Boolean)
  })
  
    }
    const updatedUser = await User.findByIdAndUpdate(userId,
        {...req.body,
    isOnboarded: true,
    },{new:true});

    if(!updatedUser) return res.status(404).json({message:"user not found"})
        res.status(200).json({success:true, user:updatedUser})
    
 }
   
   
   catch(error){
    console.error("onboarding error:", error)
 res.status(500).json({message:"internal server error"})
   }
}