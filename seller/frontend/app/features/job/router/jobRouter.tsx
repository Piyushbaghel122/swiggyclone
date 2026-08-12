import { createRouter , createRootRoute , createRoute } from "@tanstack/react-router";
import { Suspense , lazy } from "react";

const JobRootRoute = createRootRoute({});

const JobRoute = JobRootRoute.addChildren([]);

const JobRouter = createRouter({
    routeTree:JobRoute
})

export default JobRouter;