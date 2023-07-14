import { Schema, model } from "mongoose";
import { LinksInterfaces } from "../interfaces/Interfaces";


const LinkSchema = new Schema<LinksInterfaces>(
    {
        name: {
            type: String,
            required: true
        },
        url: String,
        description: {
            type: String,
            required: true
        },
        category: {
            type: Schema.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model('Link', LinkSchema, 'links')