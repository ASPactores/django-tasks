import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from 'react-router-dom';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import AuthPage from './pages/Authentication/Authentication';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '*',
        element: <Error404 />,
    },
    {
        path: 'auth',
        element: <AuthPage />,
    },
]);

export default function App() {
    return (
        <div className="h-screen">
            <RouterProvider router={router} />
        </div>
    );
}
