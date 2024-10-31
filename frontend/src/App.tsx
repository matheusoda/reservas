import './App.css'
import { Outlet } from 'react-router-dom';
import SidebarComponent from './components/SidebarComponent';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';

export default function App() {
    const { isAuthenticated } = useAuth(); // Verifique se o usuário está autenticado

    return (
        <>
            {isAuthenticated ? (
                <SidebarComponent>
                    <Outlet /> {/* Conteúdo das rotas aparece aqui */}
                </SidebarComponent>
            ) : (
                <LoginPage /> // Renderiza a tela de login se não estiver autenticado
            )}
        </>
    );
}
