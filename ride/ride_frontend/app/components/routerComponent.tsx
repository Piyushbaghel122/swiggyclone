"use client";
import { createRoute, createRootRoute, createRouter, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const RouteRootComponent = createRootRoute();

const FrontendDashbaord = lazy(() => import("./ui/frontendDashbaord/FrontendDashbaord"));
const FrontendHome = lazy(() => import("./ui/frontendHome/FrontendHome"));

const LoginUser = lazy(() => import("../features/auth/pages/loginUserPage"));
const RegisterUser = lazy(() => import("../features/auth/pages/registerUserPage"));
const VerifyOtp = lazy(() => import("../features/auth/pages/verifyOtpPage"));
const PriceAndTacos = lazy(() => import("../components/ui/frontendHome/pricceAndTacos"))
const ApplyRide = lazy(() => import("../features/ride/pages/ApplyRide.tsx"))
const PartnerReastaurant = lazy(() => import("../features/ride/pages/PartneerReastaurant.tsx"))


const FrontendHomeRoute = createRoute({
    getParentRoute: () => RouteRootComponent,
    path: "/",
    component: () => (
        <Suspense fallback={<div>loading...</div>}>
            <FrontendHome />
        </Suspense>
    )
});

const FrontendDashBoardRoute = createRoute({
    getParentRoute: () => RouteRootComponent,
    path: "dashboard",
    component: () => (
        <Suspense fallback={<div>loading...</div>}>
            <FrontendDashbaord />
        </Suspense>
    )
});

const RouterAuthRoute = createRoute({
    getParentRoute: () => RouteRootComponent,
    path: "auth",
    component: () => <Outlet />
});

const PriceAndTacosRoute = createRoute({
    getParentRoute: () => RouteRootComponent,
    path: "priceAndTacos",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <PriceAndTacos />
        </Suspense>
    )
});

const ApplyRideRoute = createRoute({
    getParentRoute: () => RouteRootComponent,
    path: "applyride",
    component: () => (
        <Suspense fallback={<div>loading...</div>}>
            <ApplyRide />
        </Suspense>
    )
});

const PartnerRestaurnatRoute = createRoute({
    getParentRoute: () => RouteRootComponent,
    path: "/createINPartneerreastaurnat",
    component: () => (
        <Suspense fallback={<div>loading...</div>}>
            <PartnerReastaurant />
        </Suspense>
    )
});





const RouteComponent = RouteRootComponent.addChildren([
    FrontendHomeRoute,
    FrontendDashBoardRoute,
    RouterAuthRoute,
    PriceAndTacosRoute,
    ApplyRideRoute,
    RouterAuthRoute,
    PartnerRestaurnatRoute
]);

const routerComponent = createRouter({
    routeTree: RouteComponent
});
console.log("ROUTER COMPONENT IS:", routerComponent);

export default routerComponent;