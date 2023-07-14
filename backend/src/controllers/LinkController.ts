import { Request, Response } from "express";
import Category from "../models/Category";
import Link from "../models/Link";

export const create = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, url, description } = req.body

    const category = await Category.findOne({ _id: id });

    const link = new Link({ name, url, description, category:id })
    await link.save()

    return res.send({
        msg: 'Link Creado',
        category,
        link
    });
}

export const list = async(_req: Request, _res: Response)=>{}