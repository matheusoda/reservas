import { decrypt } from "../utils"; // Importe sua função de descriptografia
import { PrismaClient } from "@prisma/client"; // Importe o Prisma Client
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient(); // Cria uma instância do Prisma Client
const secret = process.env.JWT_SECRET || "seu-segredo"; // Mantenha isso em um arquivo .env

const authService = {
    async login(email: string, password: string) {
        // Busca o usuário pelo nome de usuário
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // Descriptografa a senha
        const decryptedPassword = decrypt(user!.password);

        // Valida se o usuário existe e a senha está correta
        if (!user || !user.password || password !== decryptedPassword) {
            throw new Error("Credenciais inválidas");
        }

        // Gera o token JWT
        const token = jwt.sign({ userId: user.id }, secret, {
            expiresIn: "1h"
        });

        return { token, userId: user.id };
    }
};

export default authService; // Exporta o authService
