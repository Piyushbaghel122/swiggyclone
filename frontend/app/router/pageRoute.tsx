import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const UIPage = lazy(() => import("../components/ui/UIPage"));
const AuthRouter = lazy(() => import("../features/auth/routerAuth/AuthRouter"));

const rootRoute = createRootRoute();

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <UIPage />
        </Suspense>
    ),
});


const AuthRouterRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : "/auth/$",
    component : () => (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthRouter />
        </Suspense>
    )
});


const routeTree = rootRoute.addChildren([indexRoute , AuthRouterRoute]);

const router = createRouter({ routeTree });

export default router;
