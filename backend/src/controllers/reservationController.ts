import { Request, Response } from "express";
import { ReservationService } from "../services/reservationService";

import { z } from "zod";

export async function getReservations(req: Request, res: Response) {
    try {
        const reservations = await ReservationService.getAllReservation();
        res.json(reservations);
    } catch (error) {
        res.status(400).json({ error: "Error fetching reservations" });
    }
}

export async function getReservationsByUser(req: Request, res: Response) {
    const { userId } = req.params;
    try {
        const reservations = await ReservationService.getReservationsByUserId(
            userId
        );
        res.json(reservations);
    } catch (error) {
        res.status(400).json({ error: "Error fetching reservations" });
    }
}

export async function createReservation(req: Request, res: Response) {
    const { tableId, userId, date: dateString } = req.body;

    try {
        const validation = reservationSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }
        const cleanedDateString = dateString.replace("Z", "");

        const formattedDateString = cleanedDateString.includes(":")
            ? cleanedDateString
            : `${cleanedDateString}:00`;

        const date = new Date(formattedDateString);
        if (isNaN(date.getTime())) {
            res.status(400).json({ error: "Invalid date format" });
            return;
        }

        const reservations = await ReservationService.getAllReservation();
        const menuAlreadyRegister = reservations.filter(
            (reservation) =>
                reservation.tableId === tableId && reservation.date === date
        );

        if (menuAlreadyRegister.length) {
            res.status(400).json({ error: "Table alreaydReservation" });
            return;
        }

        const reservation = await ReservationService.createReservation(
            tableId,
            userId,
            date
        );
        res.status(201).json(reservation);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Error creating reservation item" });
    }
}

export async function updateReservation(req: Request, res: Response) {
    const { id } = req.params;
    const { tableId, userId, date } = req.body;

    try {
        const validation = reservationSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message
                }))
            });
            return;
        }

        const editedReservation = await ReservationService.updateReservation(
            Number(id),
            {
                tableId,
                date
            }
        );
        res.status(201).json(editedReservation);
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({ error: "Error updating reservation item" });
    }
}

export async function deleteReservation(req: Request, res: Response) {
    const { id } = req.params;

    try {
        await ReservationService.deleteReservation(Number(id));
        res.status(200).json("Success delete reservation");
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(400).json({ error: "Error delete reservation" });
    }
}

const reservationSchema = z.object({
    tableId: z.number(),
    userId: z.string(),
    date: z.string()
});
