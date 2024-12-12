import mongoose from "mongoose"

const NutritionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    meals: [
        {
            name: {
                type: String,
                required: true,
            },
            calories: {
                type: Number,
                required: true,
            },
            protein: {
                type: Number,
                default: 0,
            },
            carbs: {
                type: Number,
                default: 0,
            },
            fats: {
                type: Number,
                default: 0,
            },
        },
    ],
});

export const Nutrition = mongoose.model('Nutrition', NutritionSchema);