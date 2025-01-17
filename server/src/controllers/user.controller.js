import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import sendMail from "../utils/sendEmail.js"
import jwt from "jsonwebtoken"
import { options } from "../constants.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access token"
        );
    }
}

const defaultMuscleAndExercise = [
    {
        name: "Abs",
        exercises: [
            { name: "Crunches", sets: [] },
            { name: "Plank", sets: [] },
            { name: "Hanging Leg Raises", sets: [] }
        ]
    },
    {
        name: "Back",
        exercises: [
            { name: "Pull-ups", sets: [] },
            { name: "Deadlift", sets: [] },
            { name: "Bent Over Row", sets: [] }
        ]
    },
    {
        name: "Biceps",
        exercises: [
            { name: "Bicep Curl", sets: [] },
            { name: "Hammer Curl", sets: [] },
            { name: "Concentration Curl", sets: [] }
        ]
    },
    {
        name: "Cardio",
        exercises: [
            { name: "Running", sets: [] },
            { name: "Cycling", sets: [] },
            { name: "Jump Rope", sets: [] }
        ]
    },
    {
        name: "Chest",
        exercises: [
            { name: "Bench Press", sets: [] },
            { name: "Incline Dumbbell Press", sets: [] },
            { name: "Push-ups", sets: [] }
        ]
    },
    {
        name: "Legs",
        exercises: [
            { name: "Squats", sets: [] },
            { name: "Leg Press", sets: [] },
            { name: "Lunges", sets: [] }
        ]
    },
    {
        name: "Shoulders",
        exercises: [
            { name: "Overhead Press", sets: [] },
            { name: "Lateral Raises", sets: [] },
            { name: "Arnold Press", sets: [] }
        ]
    },
    {
        name: "Triceps",
        exercises: [
            { name: "Tricep Dips", sets: [] },
            { name: "Skull Crushers", sets: [] },
            { name: "Overhead Tricep Extension", sets: [] }
        ]
    }
];


const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    if (
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const user = {
        username,
        email,
        password,
    };

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

    res.status(200).json({
        message: "Otp send to your mail",
        activationToken,
    });
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        throw new ApiError(400, "username or email is required");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged In Successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"));
});

const verifyUser = asyncHandler(async (req, res) => {
    const { otp, activationToken } = req.body;
    console.log(otp, activationToken);


    const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
    console.log(verify);


    if (!verify)
        return res.status(400).json({
            message: "Otp Expired",
        });

    console.log(verify.otp === Number(otp));


    if (!(verify.otp === Number(otp)))
        return res.status(400).json({
            message: "Wrong Otp",
        });

    await User.create({
        username: verify.user.username,
        email: verify.user.email,
        password: verify.user.password,
        muscle: defaultMuscleAndExercise
    });

    res.json(
        new ApiResponse(200, null, "User Registered")
    );
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req?.cookies?.refreshToken || req?.body?.refreshToken;
    console.log(incomingRefreshToken);

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const {
            accessToken,
            newRefreshToken,
        } = await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                email: email,
            },
        },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"));
});



export {
    registerUser,
    loginUser,
    logoutUser,
    verifyUser,
    refreshAccessToken,
    getCurrentUser,
    updateAccountDetails
}