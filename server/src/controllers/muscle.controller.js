import { Muscle } from "../models/muscle.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addMuscle = asyncHandler(async (req, res) => {
    console.log("Requested");

    const { name, note } = req.body;
    console.log(name);

    if (!name) {
        throw new ApiError(400, "Name of muscle is required");
    }

    const existingMuscle = await Muscle.findOne({ name });
    if (existingMuscle) {
        throw new ApiError(409, "Muscle with this name already exists");
    }

    const muscle = await Muscle.create({
        name,
        note
    });

    if (!muscle) throw new ApiError(500, "Failed to add muscle");

    return res.status(200).json(new ApiResponse(201, muscle, "Muscle is created successfully"));
});

export { addMuscle };
