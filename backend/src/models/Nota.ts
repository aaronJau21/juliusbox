import { Schema, model } from "mongoose";
import { NotasInterfaces } from "../interfaces/Interfaces";


const NotaSchema = new Schema<NotasInterfaces>(
    {
        nota: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model('Nota', NotaSchema, 'notas')