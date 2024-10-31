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

function RedirectIfLoggedIn({ to }: { to: string }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to={to} /> : null;
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
        path: '/login', // Rota para a página de login
        element: <RedirectIfLoggedIn to="/" />,
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
