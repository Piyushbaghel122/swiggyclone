import { createRootRoute , createRoute  , createRouter, RouterProvider } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import AuthContextProvider from "../contextAuth";


const RegisterUser = lazy(() => import("../Pages/regitserUser"));
const LoginUser = lazy(() => import("../Pages/loginUser"));
const NewPasswordAndConfirmPassword = lazy(() => import("../Pages/newPasword"));
const SendLink = lazy(() => import("../Pages/sendLink"));
const LogoutUser = lazy(() => import("../Pages/logoutUser"));
const SendOtp = lazy(() => import("../Pages/sendOpt"));
const EditPhoneNumber = lazy(() => import("../Pages/editPhoneNumber"))

const rootRoute = createRootRoute();

const RegisterUserRoute = createRoute({
    path: "/register",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterUser />
        </Suspense>
    ),
    getParentRoute: () => rootRoute,
});

const LoginUserRoute = createRoute({
    path: "/login", 
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginUser />
        </Suspense>
    ),
    getParentRoute: () => rootRoute,
});

const LogoutUserRoute = createRoute({
    path: "/logout",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <LogoutUser />
        </Suspense>
    ),
    getParentRoute: () => rootRoute,
});

const NewPasswordAndConfirmPasswordRoute = createRoute({
    path: "/changePassword",
    component: () => (
        <Suspense>
            <NewPasswordAndConfirmPassword />
        </Suspense>
    ),
    getParentRoute: () => rootRoute,
});

const sendLinkRoute = createRoute({
    path: "/sendlink",
    component: () => (
        <Suspense>
            <SendLink />
        </Suspense>
    ),
    getParentRoute: () => rootRoute,
});

const sendOptRoute = createRoute({
    path: "/sendOtp",
    component: () => (
        <Suspense>
            <SendOtp />
        </Suspense>
    ),
    getParentRoute: () => rootRoute,
});

const editPhoneNumberRoute = createRoute({
    path: "/editPhoneNumber",
    component: () => (
        <Suspense>
            <EditPhoneNumber />
        </Suspense>
    ),
    getParentRoute: () => rootRoute,
});

const rootTree  = rootRoute.addChildren([
    RegisterUserRoute , LoginUserRoute , LogoutUserRoute , 
    sendLinkRoute , NewPasswordAndConfirmPasswordRoute , sendOptRoute , editPhoneNumberRoute
]);



const AuthRouter = createRouter({
    routeTree : rootTree,
    basepath: '/auth'
});

export default function AuthApp() {
    return (
        <AuthContextProvider>
            <RouterProvider router={AuthRouter} />
        </AuthContextProvider>
    );
}