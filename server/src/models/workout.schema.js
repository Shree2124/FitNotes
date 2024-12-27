import mongoose from "mongoose";
import { ExerciseSchema } from "./exercise.schema.js";


const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    exercises: [ExerciseSchema],
}, {
    timestamps: true
});

export const Workout = mongoose.model('Workout', WorkoutSchema);
