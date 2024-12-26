import mongoose from "mongoose";

const MuscleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    note: {
        type: String,
        trim: true,
    },
    defaultWorkouts: [
        {
            name: {
                type: mongoose.Types.ObjectId,
                ref: "Workout",
                required: true
            },
        },
    ],
});

export const Muscle = mongoose.model('Muscle', MuscleSchema);