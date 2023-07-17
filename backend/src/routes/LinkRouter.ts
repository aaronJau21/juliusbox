import { Router } from "express";
import { create, list, show } from "../controllers/LinkController";

const router = Router()

router.post('/create/:id', create)
router.get('/list', list)
router.get('/show/:id', show)

export default router
