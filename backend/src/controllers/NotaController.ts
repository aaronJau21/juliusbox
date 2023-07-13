import { Request, Response } from "express";

export const create = (_req: Request, res: Response) => {

    return res.send({
        msg: 'Nota creada'
    })
}