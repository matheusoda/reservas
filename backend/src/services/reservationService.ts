import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export class ReservationService {
    // Servico que cria uma nova reserva
    static async createReservation(
        tableId: number,
        userId: string,
        date: Date
    ) {
        return prisma.reservation.create({
            data: { tableId, userId, date }
        });
    }

    // Servico que busca todas reservas
    static async getAllReservation() {
        return prisma.reservation.findMany();
    }

    // Servico que busca reservas por ID do usuário
    static async getReservationsByUserId(userId: string) {
        return prisma.reservation.findMany({ where: { userId } });
    }

    // Servico que atualiza uma reserva
    static async updateReservation(
        id: number,
        data: { tableId?: number; date?: Date }
    ) {
        return prisma.reservation.update({
            where: { id },
            data
        });
    }

    // Servico que exclui uma reserva
    static async deleteReservation(id: number) {
        return prisma.reservation.delete({ where: { id } });
    }
}
