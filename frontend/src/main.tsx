import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import App from './App.tsx'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './index.css'
import { PrimeReactProvider } from 'primereact/api';

import MenuPage from './pages/MenuPage.tsx'
import ReservationPage from './pages/ReservationPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import HomePage from './pages/HomePage.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import ConfigurationPage from './pages/Configuration.tsx';
import RegisterPage from './pages/RegisterPage.tsx';

function RedirectIfLoggedIn({ to }: { to: string }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to={to} /> : null;
};

function AdminRoute ({ element }: { element: JSX.Element }) {
  const { isAdmin } = useAuth();

  return isAdmin ? element : <Navigate to="/" />; // Redireciona para a raiz se não for admin
};


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/reservas',
        element: <ReservationPage />,
      },
      {
        path: '/menu',
        element: <MenuPage />,
      },
      {
        path: '/configuracao',
        element: <AdminRoute element={<ConfigurationPage />} />,
      },
      {
        path: '/login', // Rota para a página de login
        element: <RedirectIfLoggedIn to="/" />,
      },
      {
        path: '/cadastro', // Rota para a página de login
        element: <RegisterPage />,
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </PrimeReactProvider>
  </StrictMode>,
)
