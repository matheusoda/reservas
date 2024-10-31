// src/server.ts
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
