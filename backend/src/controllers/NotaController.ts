import { Request, Response } from "express";
import Nota from "../models/Nota";

export const create = async (req: Request, res: Response) => {

    const { nota } = req.body

    const note = new Nota({ nota })
    await note.save()

    return res.send({
        msg: 'Nota creada',
        note
    })
}

export const list = async(_req: Request, res: Response) => {
    const notes = await Nota.find()

    return res.send({
        msg:'the list Notes',
        notes
    })
}