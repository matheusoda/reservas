import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryMenuService {
    static async createCategoryMenu(name: string) {
        return prisma.category.create({
            data: { name }
        });
    }

    // Busca todos usuários
    static async getAllCategoryMenu() {
        return prisma.category.findMany();
    }

    // Atualiza uma reserva
    static async updateCategoryMenu(
        id: number,
        data: {
            name: string;
        }
    ) {
        return prisma.category.update({
            where: { id },
            data
        });
    }

    // Exclui uma reserva
    static async deleteCategoryMenu(id: number) {
        return prisma.category.delete({ where: { id } });
    }
}
