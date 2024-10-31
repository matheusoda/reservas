// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userId: string | null;
    isAdmin: boolean | null;
    login: (token: string, id: string, isAdmin: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token')); // Verifica se o token já está armazenado
    const [userId, setUserId] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('id');
        const storeIsAdmin = localStorage.getItem('isAdmin');

        if (token !== null && storedUserId !== null) {
            setIsAuthenticated(true);
            setUserId(storedUserId);
            setIsAdmin(storeIsAdmin === "true" ? true : false)
        }
    }, []);

    const login = (token: string, id: string, isAdmin: boolean) => {
        localStorage.setItem('token', token); // Armazena o token no localStorage
        localStorage.setItem('id', id);
        localStorage.setItem('isAdmin', isAdmin === true ? "true" : "false")
        setUserId(id)
        setIsAdmin(isAdmin)
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Remove o token do localStorage
        localStorage.removeItem('id');
        localStorage.removeItem('isAmin');
        setUserId(null)
        setIsAdmin(null)
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
