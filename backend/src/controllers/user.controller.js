import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res){

    try{
        const currentUserId= req.user.id;
        const currentUser= req.user


        const recommendedUsers= await User.find({
            $and:[
                {_id:{$ne: currentUserId}},
                {$id:{$nin: currentUser.friends}},
                {isOnboarded:true},
            ]
        })
        res.status(200).json({recommendedUsers})
    }catch(error){
        console.log("Error in getRecommendedUsers controller", error);
        res.status(500).json({message:"Internal Server Error"})
    }

}


export async function getMyFriends (req, res){
    try{
        const user=await User.findById(req.user.id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage")

        res.status(200).json(user.friends)
    }catch(error){
        console.log("Error in getMyFriends controller", error);
        res.status(500).json({message:"Internal Server Error"})

    }

}


export async function sendFriendRequest(req, res) {
    try{
   const myId=req.user.id;
   const{id : recipientId}= req.params;

   //prevetn senfding req to yourself
   if(myId===recipientId){
    return res.status(400).json({message:"you cannot send friends request to yourself"})
   }


  const recipient = await User.findById(recipientId)
   if(!recipient){
    return res.status(404).json({message:"User not found"})
   }



   //check if user is already friends
   if (recipient.friends.includes(myId)){
    return res.status(400).json({message:"you are already friends with the user"})
   }
    

   //check if friends req already exists
   const existingRequest= await FriendRequest.findOne({
    $or:[
        {sender: myId, recipient: recipientId},
        {sender: recipientId, recipient: myId}
    ]
   })


   //if request exists, return status 400
   if (existingRequest){
    return res.status(400).json({message:"Friend request already exists"})
   }

    //create new friend request
    const friendRequest = await FriendRequest.create({
        sender: myId,
        recipient: recipientId
    });
    }
    
    catch(error){

    }
    
}