import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import User from "../models/User";
import { createToken } from "../services/Jwt";

export const register = async (req: Request, res: Response) => {

    const { name, email, password } = req.body

    let user = await User.findOne({ email })

    if (user) {
        return res.send({
            status: 'Error',
            msg: `El usuario ya existe ${user.email} ya existe`
        })
    }

    user = new User({ name, email, password })
    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(password, salt)

    user.password = hash
    await user.save()

    return res.send({
        msg: 'Se registro Correctamente',
        user: {
            name: user.name,
            email: user.email
        }
    })
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).send({
            status: 'Error',
            msg: 'Credenciales incorrectos'
        })
    }

    const pwd = await bcryptjs.compare(password, user.password)
    if (!pwd) {
        return res.status(404).send({
            status: 'Error',
            msg: 'Credenciales incorrectos'
        })
    }

    const token = createToken(
        user.id,
        user.name,
        user.email
    )

    return res.send({
        msg: 'Entro correctamente',
        user: {
            name: user.name,
            email: user.email
        },
        token
    })
}