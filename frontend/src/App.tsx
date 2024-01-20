import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Error404 from './pages/Error404';
import AuthPage from './pages/Authentication/AuthPage';
import { AddMoreListContextProvider } from './contexts/AddMoreListContextProvider';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'auth',
        element: <AuthPage />,
    },
    {
        path: '*',
        element: <Error404 />,
    },
]);

export default function App() {
    return (
        <div className="h-screen">
            <AddMoreListContextProvider>
                <RouterProvider router={router} />
            </AddMoreListContextProvider>
        </div>
    );
}
