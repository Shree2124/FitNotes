import { Muscle } from "../models/muscle.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const addMuscle = asyncHandler(async (req, res) => {
    console.log("Requested");

    const { name } = req.body;
    const user = req.user
    console.log(name);

    if (!name) {
        throw new ApiError(400, "Name of muscle is required");
    }

    const existingMuscle = user?.muscle?.some((obj) => obj.name === name)


    if (existingMuscle) {
        throw new ApiError(409, "Muscle with this name already exists");
    }

    const dbUser = await User.findById(user._id).select("-password -refreshToken")

    dbUser?.muscle?.push({ name: name, exercises: [] })

    const resUser = (await dbUser.save())

    // if (!muscle) throw new ApiError(500, "Failed to add muscle");

    return res.status(200).json(new ApiResponse(201, resUser, "Muscle is created successfully"));
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
    const user = req.user

    if (name?.trim() === "") {
        throw new ApiError(400, "Muscle name is required")
    }

    const dbUser = await User.findById(user._id).select("-password -refreshTokens")

    const existingMuscle = user?.muscle?.some((obj) => obj.name === name)


    if (existingMuscle) {
        throw new ApiError(409, "Muscle with this name already exists");
    }

    const updatedArray = dbUser.muscle?.filter((obj) => obj.name !== name)
    dbUser.muscle = updatedArray
    await dbUser.save()

    return res.status(200).json(new ApiResponse(200, dbUser, "Muscle deleted Successfully"))
})

export { addMuscle, editMuscle, deleteMuscle };
