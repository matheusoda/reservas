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
    getReservationsByUser,
    updateReservation,
    deleteReservation
} from "../controllers/reservationController";

import {
    createMenu,
    deleteMenu,
    getMenus,
    updateMenu
} from "../controllers/menuController";

import {
    createCategoryMenu,
    deleteCategoryMenu,
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
router.put("/reservations/:id", updateReservation);
router.delete("/reservations/:id", deleteReservation);

// Rotas de cardapio
router.get("/menus", getMenus);
router.post("/menus", createMenu);
router.put("/menus/:id", updateMenu);
router.delete("/menus/:id", deleteMenu);

// Rotas de catergoria de cardapio
router.get("/categoryMenu", getCategoryMenus);
router.post("/categoryMenu", createCategoryMenu);
router.put("/categoryMenu/:id", updateCategoryMenu);
router.delete("/categoryMenu/:id", deleteCategoryMenu);

// Rotas de mesas
router.get("/tables", getTables);
router.post("/tables", createTable);
router.put("/tables/:id", updateTable);
router.delete("/tables/:id", deleteTable);
export default router;
