import { createRoute, createRootRoute, createRouter } from "@tanstack/react-router";

// root route
const rootConstantRootRoute = createRootRoute();

const ConstantRoute = rootConstantRootRoute.addChildren([])

const ConstantRouter = createRouter({ routeTree: rootConstantRootRoute })

export default ConstantRouter;