import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const RegisterUser = lazy(() => import("../pages/registerUserPage") )

const rootRootAuth = createRootRoute({});

const RegisterRoute = createRoute({
  getParentRoute: () => rootRootAuth,
  path: "/register",
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterUser />
    </Suspense>
  ),
});

const rootRouterAuth = rootRootAuth.addChildren([RegisterRoute]);

export const routerAuth = createRouter({ routeTree: rootRouterAuth });
