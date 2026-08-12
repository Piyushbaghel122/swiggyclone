import { createBrowserRouter } from 'react-router-dom';
import Register from "../features/auth/pages/RegisterPage";
import Mobile from "../features/auth/pages/mobile";
import Frontend from "../components/ui/frontend";
import Dashboard from "../components/ui/frontendDashbaord";

const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/mobile",
        element: <Mobile />
    },
    {
        path: "/",
        element: <Frontend />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }

]);

export default router;