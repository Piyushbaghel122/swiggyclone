import { createRootRoute, createRouter, createRoute, RouterProvider } from "@tanstack/react-router"; 
import { lazy, Suspense } from "react";

const CartPage = lazy(() => import("../pages/CartPage"));

const rootCart = createRootRoute();

const cartPageRoute = createRoute({
    getParentRoute: () => rootCart,
    path: "/",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <CartPage />
        </Suspense>
    ),
});

const rootRootCart = rootCart.addChildren([cartPageRoute]);

const cartRouter = createRouter({ 
    routeTree: rootRootCart,
    basepath: "/cart",
});

export default function CartApp() {
    return <RouterProvider router={cartRouter} />;
}