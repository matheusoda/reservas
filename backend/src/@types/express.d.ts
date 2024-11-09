// src/@types/express.d.ts
import { JwtPayload } from "jsonwebtoken"; // Importe o tipo JwtPayload se estiver usando o jwt.verify

declare global {
    namespace Express {
        export interface Request {
            user?: string | JwtPayload; // Ajuste o tipo conforme necessário, aqui `user` é opcional
        }
    }
}
