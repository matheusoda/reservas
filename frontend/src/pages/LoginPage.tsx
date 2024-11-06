import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './LoginPage.css';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password,
            });

            const { token, userId, isAdmin } = response.data.data;
            login(token, userId, isAdmin);

            window.location.href = '/';
        } catch (error) {
            setErrorMessage('Credenciais inválidas');
            console.error('Erro no login:', error);
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card py-3 px-5">
                <h2 className='text-2xl font-semibold mb-2'>Login</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleLogin}>
                    <div className="field flex flex-col">
                        <label htmlFor="username">Usuário</label>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="field flex flex-col">
                        <label htmlFor="password">Senha</label>
                        <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <div className='w-full flex justify-center mt-2'>
                            <Button className=' bg-blue-300 px-2 py-1 text-white' type="submit" label="Entrar" />
                        </div>
                        <div className='w-full flex justify-center mt-2'>
                            <Link to='/cadastro'>Cadastro</Link>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
}
