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

const editMuscle = asyncHandler(async (req, res) => {
    const { name, note } = req.body
    const { muscleId } = req.params
    console.log(muscleId);


    if (!name) {
        throw new ApiError(400, "Name is required")
    }

    const muscle = await Muscle.findOne({ _id: muscleId })

    if (!muscle) {
        throw new ApiError(404, "Muscle not found")
    }

    const updatedMuscle = await Muscle.findOneAndUpdate(
        { _id: muscleId },
        { $set: { name, note } },
        { new: true }
    )

    return res.status(200).json(new ApiResponse(201, updatedMuscle, "Muscle updated Successfully"))
});

const deleteMuscle = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (name?.trim() === "") {
        throw new ApiError(400, "Muscle name is required")
    }

    const muscle = await Muscle.findOne({name})

    if (!muscle) {
        throw new ApiError(404, "Muscle not found")
    }

    await Muscle.deleteOne({ name })
    return res.status(200).json(new ApiResponse(200, null, "Muscle deleted Successfully"))
})

export { addMuscle, editMuscle, deleteMuscle };
