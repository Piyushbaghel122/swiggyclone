import { createRoute, createRouter, createRootRoute, lazyRouteComponent } from "@tanstack/react-router";

// Create root route 
const rootRoute = createRootRoute();

// Example of dynamically creating routes from an array
const restaurantPages = [
    {
        path: "/registeration",
        component: () => import("../pages/regiterReastaurant")
    },
    // Add more restaurant pages here
    // { path: "/pizza-hut", component: () => import("../pages/Pizza_Hut") },
];

const dynamicRoutes = restaurantPages.map((page) => {
    return createRoute({
        getParentRoute: () => rootRoute,
        path: page.path,
        component: lazyRouteComponent(page.component)
    });
});

const routeTree = rootRoute.addChildren([
    ...dynamicRoutes
]);

const restaurantRouter = createRouter({ routeTree });

export default restaurantRouter;