import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import sendMail from "../utils/sendEmail.js"

const registerUser = asyncHandler(async(req,res)=>{
    const {username, fullName, password, email} = req.body

    if([username, fullName, password, email]?.some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const existUser = await User.findOne({$or: [{ username }, { email }]})

    if(existUser){
        throw new ApiError(400, "User with username or email already exist")
    }

    const user = await User.create({
        username,
        fullName,
        password,
        email
    })

    if(!user){
        throw new ApiError(500, "Something went wrong while registering user")
    }
    
    const otp = Math.floor(Math.random() * 1000000);

    const activationToken = jwt.sign(
        {
            user,
            otp,
        },
        process.env.ACTIVATION_SECRET,
        {
            expiresIn: "5m",
        }
    );

    const data = {
        username,
        otp,
    };

    await sendMail(email, "FitNotes", data);

    return res.status(200).json(new ApiResponse(201, activationToken,"User created Successfully"))
})