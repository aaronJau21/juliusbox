import { Router } from "express";
import { create } from "../controllers/CategoryController";


const router = Router()

router.post('/create',create)

export default router