import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './RegisterPage.css'; // Estilo para a página de registro

export default function RegisterPage() {
    const token = localStorage.getItem('token');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/user', {
                email,
                username,
                password,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
             });
            setSuccessMessage('Usuário registrado com sucesso!');
            setErrorMessage(''); // Limpa a mensagem de erro
        } catch (error) {
            setErrorMessage('Erro ao registrar o usuário. Tente novamente.');
            setSuccessMessage(''); // Limpa a mensagem de sucesso
            console.error('Erro no registro:', error);
        }
    };

    return (
        <div className="register-container">
            <Card className="register-card py-3 px-5">
                <h2 className='text-2xl font-semibold mb-2'>Registrar Usuário</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <form onSubmit={handleRegister}>
                    <div className="field flex flex-col mb-4">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="field flex flex-col mb-4">
                        <label htmlFor="username">Usuário</label>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="field flex flex-col mb-4">
                        <label htmlFor="password">Senha</label>
                        <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='w-full flex justify-content-center'>
                        <Button type="submit" label="Registrar" />
                    </div>
                </form>
            </Card>
        </div>
    );
}
