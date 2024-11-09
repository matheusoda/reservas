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
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Rota de login
router.post("/login", login);

// Rotas de usuarios
router.get("/users", authMiddleware, getUsers);
router.post("/users", authMiddleware, createUser);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

// Rotas de reservas
router.get("/reservations", authMiddleware, getReservations);
router.get("/reservations/user/:userId", authMiddleware, getReservationsByUser);
router.post("/reservations", authMiddleware, createReservation);
router.put("/reservations/:id", authMiddleware, updateReservation);
router.delete("/reservations/:id", authMiddleware, deleteReservation);

// Rotas de cardapio
router.get("/menus", authMiddleware, getMenus);
router.post("/menus", authMiddleware, createMenu);
router.put("/menus/:id", authMiddleware, updateMenu);
router.delete("/menus/:id", authMiddleware, deleteMenu);

// Rotas de catergoria de cardapio
router.get("/categoryMenu", authMiddleware, getCategoryMenus);
router.post("/categoryMenu", authMiddleware, createCategoryMenu);
router.put("/categoryMenu/:id", authMiddleware, updateCategoryMenu);
router.delete("/categoryMenu/:id", authMiddleware, deleteCategoryMenu);

// Rotas de mesas
router.get("/tables", authMiddleware, getTables);
router.post("/tables", authMiddleware, createTable);
router.put("/tables/:id", authMiddleware, updateTable);
router.delete("/tables/:id", authMiddleware, deleteTable);
export default router;
