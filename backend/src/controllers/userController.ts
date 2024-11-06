import { Request, Response } from "express";
import { UserService } from "../services/userService";

import { z } from "zod";

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await UserService.getAllUser();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
}

export async function createUser(req: Request, res: Response) {
    const { name, email, phone, isAdmin, password } = req.body;

    try {
        const validation = userSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const users = await UserService.getAllUser();
        const emailAlreadyRegister = users.filter(
            (user) => user.email === email
        );

        if (emailAlreadyRegister.length) {
            res.status(400).json({ error: "E-mail already in use" });
            return;
        }

        const newUser = await UserService.createUser(
            name,
            email,
            phone,
            isAdmin,
            password
        );
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
}

export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    try {
        const validation = userUpdateSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const newUser = await UserService.updateUser(id, {
            name,
            email,
            phone
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ error: "Error creating user" });
    }
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
        await UserService.deleteUser(id);

        res.status(200).json("Success delete user");
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({ error: "Error creating user" });
    }
}

const userSchema = z.object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres."),
    phone: z.string().optional()
});

const userUpdateSchema = z.object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    phone: z.string().optional()
});
