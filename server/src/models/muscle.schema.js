import mongoose from "mongoose";

const MuscleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    defaultExercises: [
        {
            name: {
                type: String,
                required: true,
            },
        },
    ],
});

export const Muscle = mongoose.model('Muscle', MuscleSchema);