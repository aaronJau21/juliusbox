import { Router } from "express";
import { create, list } from "../controllers/LinkController";

const router = Router()

router.post('/create/:id', create)
router.get('/list/:id', list)

export default router
