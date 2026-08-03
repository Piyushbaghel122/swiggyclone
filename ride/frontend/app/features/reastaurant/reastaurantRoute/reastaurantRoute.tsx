import { createRootRoute , createRoute , createRouter } from "@tanstack/react-router";
import { lazy , Suspense } from "react";


const rootReasturant  = createRootRoute();

const Dashboard  = lazy(() => import("../pages/Dashbaord"));

const MainMenuRoute  = createRoute({
    getParentRoute : () => rootReasturant,
    path : "/mainmenu",
    component : () => (
        <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
        </Suspense>
    ),
});

const rootRoute = rootReasturant.addChildren([MainMenuRoute])

const routerReastaurant = createRouter({ routeTree: rootRoute });

export default routerReastaurant;