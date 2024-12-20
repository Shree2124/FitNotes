import { Workout } from "../models/workout.schema.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addExercise = asyncHandler(async(req, res)=>{
    const {name, note} = req.body
})