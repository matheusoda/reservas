import { Request, Response } from "express";
import { MenuService } from "../services/menuService";

import { z } from "zod";

export async function getMenus(req: Request, res: Response) {
    try {
        const menus = await MenuService.getAllMenu();
        res.json(menus);
    } catch (error) {
        res.status(400).json({ error: "Error get menus" });
    }
}

export async function createMenu(req: Request, res: Response) {
    const { name, description, price, categoryId } = req.body;

    try {
        const validation = menuSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const menus = await MenuService.getAllMenu();
        const menuAlreadyRegister = menus.filter((menu) => menu.name === name);

        if (menuAlreadyRegister.length) {
            res.status(400).json({ error: "Menu item already exists" });
            return;
        }

        const menu = await MenuService.createMenu(
            name,
            description,
            price,
            categoryId
        );

        res.status(201).json(menu);
    } catch (error) {
        res.status(400).json({ error: "Error creating menu item" });
    }
}

export async function updateMenu(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, price, categoryId } = req.body;

    try {
        const validation = menuSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const editedMenu = await MenuService.updateMenu(Number(id), {
            name,
            description,
            price,
            categoryId
        });
        res.status(201).json(editedMenu);
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({ error: "Error updating menu item" });
    }
}

export async function deleteMenu(req: Request, res: Response) {
    const { id } = req.params;

    try {
        await MenuService.deleteMenu(Number(id));
        res.status(200).json("Success delete menu item");
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({ error: "Error delete menu item" });
    }
}

const menuSchema = z.object({
    name: z.string().min(5, "O nome precisa ter pelo menos 5 caracteres."),
    description: z.string().optional(),
    price: z.number(),
    categoryId: z.number()
});
