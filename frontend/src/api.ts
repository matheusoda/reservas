// api.ts
import axios from "axios";

// Cria uma instância do Axios com a URL base da API
const api = axios.create({
    baseURL: "http://localhost:5000/api"
});

// Função para buscar categorias
export const fetchCategories = async () => {
    const response = await api.get("/categoryMenu");
    return response.data;
};

// Função para buscar itens do menu
export const fetchMenuItems = async () => {
    const response = await api.get("/menus");
    return response.data;
};

// Função para buscar mesas cadastradas
export const fetchTables = async () => {
    const response = await api.get("/tables");
    return response.data;
};

// Função para buscar mesas cadastradas
export const fetchReservations = async () => {
    const response = await api.get("/reservations/user/");
    return response.data;
};

// Função para buscar usuarios
export const fetchUser = async () => {
    const response = await api.get("/users");
    return response.data;
};

export default api;
