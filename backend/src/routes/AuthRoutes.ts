import { Router } from "express";
import { login, register } from "../controllers/AuthController";
import { ValidatorLogin, ValidatorRegister } from "../helpers/Validator";

const router = Router()

router.post('/register', ValidatorRegister, register)
router.post('/login', ValidatorLogin, login)

export default router