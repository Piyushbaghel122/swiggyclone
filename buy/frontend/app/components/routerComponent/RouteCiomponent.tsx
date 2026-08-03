"use client";

import { 
    createRootRoute, 
    createRoute, 
    createRouter, 
    RouterProvider, 
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";


// 1. Create Root Route
const rootComponentRoute = createRootRoute();


const rootRoute = rootComponentRoute.addChildren([])

// 4. Create the router instance
const rootMainComponent = createRouter({
    routeTree: rootRoute,
});

// 5. Main Provider Component rendering RouterProvider
export default function ReactRouter() {
    return (
        <RouterProvider router={rootMainComponent} />
    );
}

