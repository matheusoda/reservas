import { Request, Response } from "express";

// src/controllers/authController.js
import authService from "../services/authService";

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
        const data = await authService.login(username, password);
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Error login" });
    }
}
