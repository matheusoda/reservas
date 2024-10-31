// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userId: string | null;
    login: (token: string, id: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token')); // Verifica se o token já está armazenado
    const [userId, setUserId] = useState<string | null>(null);

    const login = (token: string, id: string) => {
        localStorage.setItem('token', token); // Armazena o token no localStorage
        setUserId(id);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Remove o token do localStorage
        setUserId(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
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
