// src/routes/routes.ts
import { Router } from "express";

import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/userController";

import {
    getReservations,
    createReservation,
    getReservationsByUser
} from "../controllers/reservationController";

import {
    createMenu,
    deleteMenu,
    getMenus,
    updateMenu
} from "../controllers/menuController";

import {
    createCategoryMenu,
    getCategoryMenus,
    updateCategoryMenu
} from "../controllers/categoryMenuController";

import {
    createTable,
    deleteTable,
    getTables,
    updateTable
} from "../controllers/tableController";
import { login } from "../controllers/authController";

const router = Router();

// Rota de login
router.post("/login", login);

// Rotas de usuarios
router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Rotas de reservas
router.get("/reservations", getReservations);
router.get("/reservations/user/:userId", getReservationsByUser);
router.post("/reservations", createReservation);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Rotas de cardapio
router.get("/menu", getMenus);
router.post("/menu", createMenu);
router.put("/users/:id", updateMenu);
router.delete("/users/:id", deleteMenu);

// Rotas de catergoria de cardapio
router.get("/categoryMenu", getCategoryMenus);
router.post("/categoryMenu", createCategoryMenu);
router.put("/categoryMenu/:id", updateCategoryMenu);
router.delete("/categoryMenu/:id", deleteUser);

// Rotas de mesas
router.get("/tables", getTables);
router.post("/tables", createTable);
router.put("/tables/:id", updateTable);
router.delete("/tables/:id", deleteTable);
export default router;
