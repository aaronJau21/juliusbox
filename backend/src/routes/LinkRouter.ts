import { Router } from "express";
import { create } from "../controllers/LinkController";

const router = Router()

router.post('/create/:id', create)
router.get('/list/:id', create)

export default router
