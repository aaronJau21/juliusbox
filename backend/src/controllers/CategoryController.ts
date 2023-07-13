import { Request, Response } from 'express';
import Category from '../models/Category';

export const create = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;

        // Validar si la categoría ya existe
        const existingCategory = await Category.findOne({ title });
        if (existingCategory) {
            return res.status(400).send({
                status: 'Error',
                msg: 'La categoría ya existe',
            });
        }

        // Crear nueva categoría
        const category = new Category({ title });
        await category.save();

        return res.send({
            msg: 'Se creó la categoría correctamente',
            category,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error al crear la categoría' });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const id = req.params.id;

        // Actualizar la categoría por su ID
        const category = await Category.findByIdAndUpdate(id, { title });

        if (!category) {
            return res.status(404).send({
                msg: 'No se encontró la categoría',
            });
        }

        return res.send({
            msg: 'Se actualizó correctamente',
            category,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error al actualizar la categoría' });
    }
};

export const list = async (_req: Request, res: Response) => {
    try {
        const categories = await Category.find();

        return res.send({
            msg: 'Lista de las categorías',
            categories,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error al obtener las categorías' });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        // Eliminar la categoría por su ID
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).send({
                msg: 'No se encontró la categoría',
            });
        }

        return res.send({
            msg: 'Se eliminó correctamente',
            category,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error al eliminar la categoría' });
    }
};