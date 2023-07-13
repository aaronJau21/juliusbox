import { Router } from "express";
import { create, list } from "../controllers/NotaController";
import { validatorCreateNote } from "../helpers/Validator";


const router = Router()

router.post('/create', validatorCreateNote, create)
router.get('/list', list)

export default router