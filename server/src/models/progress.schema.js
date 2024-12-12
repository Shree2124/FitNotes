import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    muscleProgress: [
        {
            muscle: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Muscle',
                required: true,
            },
            exercises: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    totalWeightLifted: {
                        type: Number,
                        default: 0,
                    },
                    totalReps: {
                        type: Number,
                        default: 0,
                    },
                },
            ],
        },
    ],
    weight: {
        type: Number,
        required: true,
    },
    bodyFatPercentage: {
        type: Number,
        default: 0,
    },
    muscleMass: {
        type: Number,
        default: 0,
    },
});


export const Progress = mongoose.model('Progress', ProgressSchema);