import { body } from "express-validator";
import RequestError from "./RequestError";

export const ValidatorRegister = [
    body('name', 'El nombre es muy pequeño').trim().isLength({ min: 15 }),
    body('email', 'El email no es valido').trim().isEmail().normalizeEmail().toLowerCase(),
    body('password', 'El password es muy pequeño').trim().isLength({ min: 6 }).toLowerCase(),
    RequestError
]

export const ValidatorLogin = [
    body('email', 'El email no es valido').trim().isEmail().normalizeEmail().toLowerCase(),
    body('password', 'El password es muy pequeño').trim().isLength({ min: 6 }).toLowerCase(),
    RequestError
]


export const ValidatorCreateProduct = [
    body('title', 'Titulo muy corto').trim().isLength({ min: 10 }),
    RequestError
]

export const ValidatorUpdateProduct = [
    body('title', 'Titulo muy corto').trim().isLength({ min: 10 }),
    RequestError
]

export const validatorCreateNote = [
    body('nota', 'Esta vacio').notEmpty(),
    RequestError
]