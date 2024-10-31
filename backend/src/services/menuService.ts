import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MenuService {
    static async createMenu(
        name: string,
        description: string,
        price: number,
        categoryId: number
    ) {
        return prisma.menu.create({
            data: { name, description, price, categoryId }
        });
    }

    // Busca todos usuários
    static async getAllMenu() {
        return prisma.menu.findMany();
    }

    // Atualiza uma reserva
    static async updateMenu(
        id: number,
        data: {
            name: string;
            description: string;
            price: number;
            categoryId: number;
        }
    ) {
        return prisma.menu.update({
            where: { id },
            data
        });
    }

    // Exclui uma reserva
    static async deleteMenu(id: number) {
        return prisma.menu.delete({ where: { id } });
    }
}
