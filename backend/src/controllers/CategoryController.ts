import { Request, Response } from "express";
import Caterory from "../models/Category";

export const create = async (req: Request, res: Response) => {

    const { title } = req.body

    let category = await Caterory.findOne({ title })

    if (category) {
        return res.send({
            status: 'Error',
            msg: 'Ya se encuentra la categoria'
        })
    }

    category = new Caterory({ title })
    await category.save()

    return res.send({
        msg: 'Se creo la categoria correctamente',
        category
    })
}

export const update = async (req: Request, res: Response) => {

    const { title } = req.body
    const id = req.params.id

    const category = await Caterory.findByIdAndUpdate(id, { title })

    return res.send({
        msg: 'Se actualizo correctamente',
        category
    })
}

export const list = async (_req: Request, res: Response) => {

    const category = await Caterory.find()

    return res.send({
        msg:'Lista de los links',
        category
    })

}

export const remove = async (req: Request, res: Response) => {

    const id = req.params.id

    const category = await Caterory.findByIdAndDelete(id)

    return res.send({
        msg: 'Se elimino correctamente',
        category
    })

}