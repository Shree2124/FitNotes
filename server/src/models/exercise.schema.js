import mongoose from "mongoose";

export const ExerciseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    muscleId: {
        type: mongoose.Types.ObjectId,
        ref: 'Muscle',
        required: true,
    },
    workoutId: {
        type: mongoose.Types.ObjectId,
        ref: "Workout",
        required: true
    },
    sets: [
        {
            reps: {
                type: Number,
                required: true,
            },
            weight: {
                type: Number,
                required: true,
            },
        },
    ],
}, { timestamps: true })

export const Exercise = mongoose.model('Exercise', ExerciseSchema);