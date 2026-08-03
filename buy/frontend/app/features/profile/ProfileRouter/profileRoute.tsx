

import { createRootRoute , createRouter, createRoute, RouterProvider } from "@tanstack/react-router";
import { lazy , Suspense} from "react"
import ProfileContextProvider from "../ProfileContext";

const SettingsPage = lazy(() => import("../pages/SettingPage"));
const MyProfilePage = lazy(() => import("../pages/MyProfilePage"));
const LogoutPage = lazy(() => import("../pages/logoutPage"));
const PaymentHistoryPage = lazy(() => import("../pages/payMenentHistory"));
const OrderPage = lazy(() => import("../pages/OrderPage"));
const AddressPage = lazy(() => import("../pages/AddressPage"));
const FavoritesPage = lazy(() => import("../pages/FavoritesPage"));

const profileRouter = createRootRoute();

const SettingRoute = createRoute({
    getParentRoute: () => profileRouter,
    path: "/setting",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <SettingsPage />
        </Suspense>
    ),
});

const MyProfileRoute = createRoute({
    getParentRoute: () => profileRouter,
    path: "/myprofile",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <MyProfilePage />
        </Suspense>
    ),
});


const LogoutRoute = createRoute({
    getParentRoute: () => profileRouter,
    path: "/logout",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <LogoutPage />
        </Suspense>
    ),
});

const PaymentHistoryRoute = createRoute({
    getParentRoute: () => profileRouter,
    path: "/paymenthistory",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentHistoryPage />
        </Suspense>
    ),
});

const OrderRoute = createRoute({
    getParentRoute: () => profileRouter,
    path: "/order",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderPage />
        </Suspense>
    ),
});

const AddressRoute = createRoute({
    getParentRoute: () => profileRouter,
    path: "/address",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <AddressPage />
        </Suspense>
    ),
});

const FavoritesRoute = createRoute({
    getParentRoute: () => profileRouter,
    path: "/favorites",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <FavoritesPage />
        </Suspense>
    ),
});


const rootProfile = profileRouter.addChildren([
    SettingRoute,
    MyProfileRoute,
    LogoutRoute,
    PaymentHistoryRoute,
    OrderRoute,
    AddressRoute,
    FavoritesRoute,
]);


const userProfile = createRouter({ routeTree: rootProfile, basepath: "/user" });

export default function ProfileApp() {
    return (
        <ProfileContextProvider>
            <RouterProvider router={userProfile} />
        </ProfileContextProvider>
    );
}

