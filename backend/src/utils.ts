import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
// const SECRET_KEY = crypto.randomBytes(32); // ou use dotenv para carregá-la como uma variável de ambiente segura
const SECRET_KEY = Buffer.from(
    "127388e47475673c9e9d5da799384ed5b37df4670a293894bc402aa0be61e276",
    "hex"
);
const IV_LENGTH = 16; // IV padrão para o algoritmo aes-256-cbc

// Função para criptografar
export function encrypt(text: string): string {
    try {
        const iv = crypto.randomBytes(IV_LENGTH); // Gera um novo IV
        const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
        let encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");
        return iv.toString("hex") + ":" + encrypted;
    } catch (error: any) {
        console.log(error);
        return error.toString();
    }
}

// Função para descriptografar
export function decrypt(encryptedText: string): string {
    const [iv, encrypted] = encryptedText.split(":");

    if (!iv || !encrypted) {
        throw new Error("Invalid encrypted text format");
    }

    const ivBuffer = Buffer.from(iv, "hex");

    if (ivBuffer.length !== IV_LENGTH) {
        throw new Error("Invalid IV length");
    }

    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, ivBuffer);

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
