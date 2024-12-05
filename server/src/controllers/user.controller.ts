import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import sendMail from "../utils/sendEmail";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { username, fullName, password, email }: { username: string, fullName: string, password: string, email: string } = req.body;

  if ([username, fullName, password, email].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existUser) {
    throw new ApiError(400, "User with username or email already exists");
  }

  // Create new user
  const user = await User.create({
    username,
    fullName,
    password,
    email,
  });

  if (!user) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  // Generate OTP and activation token
  const otp = Math.floor(Math.random() * 1000000); // Generate a 6-digit OTP

  const activationToken = jwt.sign(
    { user, otp },
    process.env.ACTIVATION_SECRET as string,
    { expiresIn: "5m" }
  );

  const data:any = {
    username,
    otp,
  };

  // Send activation email
  await sendMail(email, "FitNotes", data);

  // Respond to the client
  res.status(200).json(new ApiResponse(201, activationToken, "User created successfully"));
});
