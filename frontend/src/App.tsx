import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Error404 from './pages/Error404';
import AuthPage from './pages/Authentication/AuthPage';
import { AddMoreListContextProvider } from './contexts/AddMoreListContextProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

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

const queryClient = new QueryClient();

export default function App() {
    return (
        <div className="h-screen">
            <QueryClientProvider client={queryClient}>
                <AddMoreListContextProvider>
                    <RouterProvider router={router} />
                </AddMoreListContextProvider>
            </QueryClientProvider>
        </div>
    );
}
