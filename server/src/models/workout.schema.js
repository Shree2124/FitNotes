import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    exercises: [
        {
            muscle: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Muscle',
                required: true,
            },
            name: {
                type: String,
                required: true,
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
        },
    ],
    notes: {
        type: String,
        trim: true,
    },
});

export const Workout = mongoose.model('Workout', WorkoutSchema);