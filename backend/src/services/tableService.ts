import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TableService {
    static async createTable(name: string) {
        return prisma.table.create({
            data: { name }
        });
    }

    // Busca todas as mesas
    static async getAllTable() {
        return prisma.table.findMany();
    }

    // Atualiza uma mesa
    static async updateTable(
        id: number,
        data: {
            name: string;
        }
    ) {
        return prisma.table.update({
            where: { id },
            data
        });
    }

    // Exclui uma mesa
    static async deleteTable(id: number) {
        return prisma.table.delete({ where: { id } });
    }
}
