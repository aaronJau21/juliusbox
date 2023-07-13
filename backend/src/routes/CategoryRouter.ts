import { Router } from "express";
import { create, list, remove, update } from "../controllers/CategoryController";
import { ValidatorCreateProduct, ValidatorUpdateProduct } from "../helpers/Validator";

const router = Router()

router.post('/create', ValidatorCreateProduct, create)
router.get('/list',list)
router.put('/update/:id', ValidatorUpdateProduct, update)
router.delete('/delete/:id', remove)

export default router