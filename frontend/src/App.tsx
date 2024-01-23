import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import ViewTasks from './pages/Home/ViewTasks';
import Error404 from './pages/Error404';
import AuthPage from './pages/Authentication/AuthPage';
import { AddMoreListContextProvider } from './contexts/AddMoreListContextProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import SideMenu from './pages/Home/components/SideMenu';

const AppLayout = () => (
    <div className="flex h-full w-full flex-row">
        <SideMenu />
        <Outlet />
    </div>
);

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <ViewTasks />,
            },
            {
                path: '/upcoming',
                element: <ViewTasks />,
            },
            {
                path: '/all',
                element: <ViewTasks />,
            },
            {
                path: 'auth',
                element: <AuthPage />,
            },
        ],
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
