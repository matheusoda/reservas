// api.ts
import axios from "axios";

// Cria uma instância do Axios com a URL base da API
const api = axios.create({
    baseURL: "http://localhost:5000/api"
});

// Adiciona o interceptor para incluir o token em todas as requisições
api.interceptors.request.use(
    (config) => {
        // Tenta pegar o token do localStorage (ou outro armazenamento)
        const token = localStorage.getItem("token");

        // Se o token estiver presente, adiciona no cabeçalho da requisição
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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
