import { createRootRoute, createRouter, createRoute, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import PhonePage from "../features/auth/pages/phonePage";
import VerifyOtpPage from "../features/auth/pages/verfiyopt";

// Lazy load the MainMenu component (named export)
const MainMenu = lazy(() => import("../features/reastaurant/pages/MainMenu").then(m => ({ default: m.MainMenu })));

const rootIndex = createRootRoute();

// The parent route for anything under /auth
const authRoute = createRoute({
    getParentRoute: () => rootIndex,
    path: '/auth',
    component: () => <Outlet /> // Passes rendering to its children
});


// The parent route for anything under /reastaurant
const reastaurant = createRoute({
    getParentRoute: () => rootIndex,
    path: "/reastaurant",
    component: () => <Outlet /> // Passes rendering to its children
});

// The child route for /reastaurant/mainmenu
const MainMenuRoute = createRoute({
    getParentRoute: () => reastaurant,
    path: "/mainmenu",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
          <MainMenu />
        </Suspense>
    )
});

// The child route for /auth/phone
const phoneRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/phone',
    component: PhonePage
});

// The child route for /auth/otp
const otpRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/otp',
    component: VerifyOtpPage
});

// Add an index route to redirect to /auth/phone
const indexRoute = createRoute({
    getParentRoute: () => rootIndex,
    path: '/',
    component: () => {
        // Simple client-side redirect for now
        if (typeof window !== "undefined") {
            window.location.href = "/auth/phone";
        }
        return null;
    }
});

// Properly structure the route tree
const routeTree = rootIndex.addChildren([
    indexRoute, 
    authRoute.addChildren([phoneRoute, otpRoute]), 
    reastaurant.addChildren([MainMenuRoute])
]);

const router = createRouter({
    routeTree
});

export default router;
