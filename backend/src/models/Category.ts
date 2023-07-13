import { Schema, model } from "mongoose";
import { CategoriesInterfaces } from "../interfaces/Interfaces";

const CategorySchema = new Schema<CategoriesInterfaces>(
    {
        title: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model('Caterory', CategorySchema, 'categories')