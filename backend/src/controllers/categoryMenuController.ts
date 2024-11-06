import { Request, Response } from "express";
import { CategoryMenuService } from "../services/categoryMenuService";

import { z } from "zod";

export async function getCategoryMenus(req: Request, res: Response) {
    try {
        const categoryMenus = await CategoryMenuService.getAllCategoryMenu();
        res.json(categoryMenus);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Error get category menu" });
    }
}

export async function createCategoryMenu(req: Request, res: Response) {
    const { name } = req.body;

    try {
        const validation = categoryMenuSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const categorys = await CategoryMenuService.getAllCategoryMenu();
        const categoryAlreadyRegister = categorys.filter(
            (category) => category.name === name
        );

        if (categoryAlreadyRegister.length) {
            res.status(400).json({ error: "Category already exists" });
            return;
        }

        const categoryMenu = await CategoryMenuService.createCategoryMenu(name);

        res.status(201).json(categoryMenu);
    } catch (error) {
        res.status(400).json({ error: "Error creating category menu" });
    }
}

export async function updateCategoryMenu(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const validation = categoryMenuSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const editedCategoryMenu = await CategoryMenuService.updateCategoryMenu(
            Number(id),
            {
                name
            }
        );
        res.status(201).json(editedCategoryMenu);
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({ error: "Error creating category menu" });
    }
}

export async function deleteCategoryMenu(req: Request, res: Response) {
    const { id } = req.params;

    try {
        await CategoryMenuService.deleteCategoryMenu(Number(id));
        res.status(200).json("Success delete category menu");
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({ error: "Error delete category menu" });
    }
}

const categoryMenuSchema = z.object({
    name: z.string().min(5, "O nome precisa ter pelo menos 5 caracteres.")
});
