import { Request, Response } from "express";

export const create = (req: Request, res: Response) => {

    const {} = req.body

    return res.send({
        msg: 'Link Creado'
    })
}