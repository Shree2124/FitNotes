import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
    muscleId: {
        type: mongoose.Schema.Types.ObjectId,
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
export const Exercise = mongoose.model('Exercise', ExerciseSchema);