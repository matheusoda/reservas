import { PrismaClient } from "@prisma/client";

import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserService {
    // Servico que criar um novo usuario
    static async createUser(
        name: string,
        email: string,
        phone: string,
        isAdmin: boolean,
        password: string
    ) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                id: randomUUID(),
                name,
                email,
                phone,
                isAdmin,
                password: hashedPassword
            }
        });

        return user;
    }

    // Servico que busca todos usuarios
    static async getAllUser() {
        return prisma.user.findMany();
    }

    // Servico que busca usuário por ID
    static async getUserById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }

    //  Servico que atualiza dados de um usuario
    static async updateUser(
        id: string,
        data: { name?: string; email?: string; phone: string }
    ) {
        return prisma.user.update({
            where: { id },
            data
        });
    }

    // Servico que exclui um usuario
    static async deleteUser(id: string) {
        return prisma.user.delete({ where: { id } });
    }
}
