import { Schema, model } from "mongoose";
import { UserInterfaces } from "../interfaces/Interfaces";


const UserSchema = new Schema<UserInterfaces>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model('User', UserSchema, 'users')