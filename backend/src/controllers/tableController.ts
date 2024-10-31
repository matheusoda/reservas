import { Request, Response } from "express";
import { TableService } from "../services/tableService";

import { z } from "zod";

export async function getTables(req: Request, res: Response) {
    try {
        const tables = await TableService.getAllTable();
        res.json(tables);
    } catch (error) {
        res.status(400).json({ error: "Error get table" });
    }
}

export async function createTable(req: Request, res: Response) {
    const { name } = req.body;

    try {
        const validation = tableSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const tables = await TableService.getAllTable();
        const tableAlreadyRegister = tables.filter(
            (table) => table.name === name
        );

        if (tableAlreadyRegister.length) {
            res.status(400).json({ error: "Table already exists" });
            return;
        }

        const table = await TableService.createTable(name);

        res.status(201).json(table);
    } catch (error) {
        res.status(400).json({ error: "Error creating table" });
    }
}

export async function updateTable(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const validation = tableSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const editedTable = await TableService.updateTable(Number(id), {
            name
        });
        res.status(201).json(editedTable);
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({ error: "Error creating table" });
    }
}

export async function deleteTable(req: Request, res: Response) {
    const { id } = req.params;

    try {
        await TableService.deleteTable(Number(id));
        res.status(200).json("Success delete table");
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({ error: "Error delete table" });
    }
}

const tableSchema = z.object({
    name: z.string().min(5, "O nome precisa ter pelo menos 5 caracteres.")
});
