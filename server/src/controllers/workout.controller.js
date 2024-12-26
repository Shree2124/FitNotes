import { Workout } from "../models/workout.schema.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addWorkout = asyncHandler(async (req, res) => {
    const { name } = req.body
    const userId = req?.user?.id

    console.log(userId);
    

    if (name?.trim() === "") {
        throw new ApiError(400, "Name is required")
    }

    const workout = await Workout.create({ userId, name })

    if(!workout) {
        throw new ApiError(500, "Failed to add workout")
    }

    return res.status(201).json(new ApiResponse(200, workout,"workout added successfully"))
})

export {
    addWorkout
}