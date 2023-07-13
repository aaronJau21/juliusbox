import { Router } from "express";
import { create } from "../controllers/LinkController";

const router = Router()

router.post('/create', create)

export default router