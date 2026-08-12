import { createRoute, createRouter, createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

// Lazy load components (Ensure these files have a default export)
const Login = lazy(() => import("../features/auth/pages/login"));
const Register = lazy(() => import("../features/auth/pages/register"));
const VerifyOtp = lazy(() => import("../features/auth/pages/verifyOtp"));
const Dashboard = lazy(() => import("../components/frontendDashboard/dashboard"));
const RidePage = lazy(() => import("../features/ride/pages/ride_page"));
const Frontend = lazy(() => import("../components/frontend/frontend"));

// Reusable wrapper for Suspense
const LazyComponent = ({ Component }: { Component: React.ElementType }) => (
  <Suspense fallback={<div className="flex h-screen items-center justify-center p-4">Loading...</div>}>
    <Component />
  </Suspense>
);

// 1. Create the Root Route
const rootRoute = createRootRoute({
  component: () => <Outlet />
});

// 2. Define the Child Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <LazyComponent Component={Frontend} /> 
});

const frontendRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    component: () => <LazyComponent Component={Dashboard} />
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <LazyComponent Component={Login} />
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => <LazyComponent Component={Register} />
});

const verifyOtpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verifyOtp",
  component: () => <LazyComponent Component={VerifyOtp} />
});

const rideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ride",
  component: () => <LazyComponent Component={RidePage} />
});


// 3. Build the Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  frontendRoute,
  loginRoute,
  registerRoute,
  verifyOtpRoute,
  rideRoute
]);

// 4. Create and export the Router
export const router = createRouter({ routeTree });

// 5. Register router types for TypeScript support
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
} 