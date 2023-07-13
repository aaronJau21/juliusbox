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
        ref: {
            type: Schema.ObjectId,
            ref: 'Category'
        }
    },
    {
        timestamps: true
    }
)

export default model('Link', LinkSchema, 'links')