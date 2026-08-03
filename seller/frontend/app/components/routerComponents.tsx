import { createRootRoute, createRouter, createRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
// create root route 
const rootRouterComponent = createRootRoute();

import HomeComponent from "./ui/Homecomponent";
const ReastaurantCreateComponent = lazy(() => import("./reastaurantcreate/reastaurant_create"))
const Reastaurant_mobile = lazy(() => import("./mobile/indexMobile"))
const Settings = lazy(() => import("./SecuritySettings"))
const VerifyOtp = lazy(() => import("./mobile/verfiyMobile"));
const INFO = lazy(() => import("./reastaurantcreate/reastaurant_info"));
const MyProfile = lazy(() => import("./myprofile/myprofile"));
const CreateOrder = lazy(() => import("./reastaurantcreate/orders/CreateOrder"));
const CreateReastauarant = lazy(() => import("./common/create-resaturant"));
const Create  = lazy(() => import("../components/common/create"));
const BankingAndCompteletePage = lazy(() => import("../components/common/BankingAndCompteletePage"));
const ResgisterationPage = lazy(() => import("../components/common/RegisterationPage"))
const FrontendComponent = lazy(() =>import("../components/ui/frontnedCompoment/frontendComponent"))
const LoginPage = lazy(() => import("../components/ui/frontnedCompoment/page/loginPage"))
const RegisterPage = lazy(() => import("../components/ui/frontnedCompoment/page/registerPage"))
const UserProfilePage = lazy(() => import("../components/ui/frontnedCompoment/page/userProfilePage"))

// create route
const indexRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/",
    component: () =>
        <Suspense fallback={<div>Loading...</div>}>
            <HomeComponent />
        </Suspense>
});
const reastaurantCreateRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/reastaurantcreate",
    component: () =>
        <Suspense fallback={<div>Loading...</div>}>
            <ReastaurantCreateComponent />
        </Suspense>
});

const Reastaurant_mobileRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/mobile",
    component: () =>
        <Suspense fallback={<div>Loading...</div>}>
            <Reastaurant_mobile />
        </Suspense>
});

const SettingsRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/settings",
    component: () =>
        <Suspense fallback={<div>Loading...</div>}>
            <Settings />
        </Suspense>
});

const verifyOtpRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/verifyOtp",
    component: () =>
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOtp />
        </Suspense>
});

const INFO_ROUTE = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/info",
    component: () =>
        <Suspense fallback={<div>Loading...</div>}>
            <INFO />
        </Suspense>
});

const MyProfileRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/myprofile",
    component: () =>
        <Suspense fallback={<div>loading...</div>}>
            <MyProfile />
        </Suspense>
})

const OrdersRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/orders",
    component: () =>
        <Suspense fallback={<div>loading...</div>}>
            <MyProfile />
        </Suspense>
})

const AddressesRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/addresses",
    component: () =>
        <Suspense fallback={<div>loading...</div>}>
            <MyProfile />
        </Suspense>
})

const HistoryRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/history",
    component: () =>
        <Suspense fallback={<div>loading...</div>}>
            <MyProfile />
        </Suspense>
});

const createOrderRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/ordercreate",
    component: () =>
        <Suspense fallback={<div>loading...</div>}>
            <CreateOrder />
        </Suspense>
});

const CreateReastauarantRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/create-reastaurant",
    component: () =>
        <Suspense fallback={<div>loading...</div>}>
            <CreateReastauarant />
        </Suspense>
});

const CreateRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/create",
    component: () => (
        <Suspense fallback={<div>loading...</div>}>
            <Create />
        </Suspense>
    )
});

const BankingAndCompleteRoute = createRoute({   
    getParentRoute: () => rootRouterComponent,
    path: "/banking",
    component: () => (
        <Suspense fallback={<div>loading...</div>}>
            <BankingAndCompteletePage />
        </Suspense>
    )
});

const ResgisterationPageRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/registeration",
    component: () => (
        <Suspense fallback={<div>loading...</div>}>
            <ResgisterationPage />
        </Suspense>
    )
});

const FrontendComponentRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/frontend",
    component: () => (
        <Suspense fallback={<div>loading...</div>}>
            <FrontendComponent />
        </Suspense>
    )
});

const loginPageRoute = createRoute({
    getParentRoute: () => rootRouterComponent, 
    path: "/login",
    component: () => (
        <Suspense fallback={<div>loading...</div>}>
            <LoginPage />
        </Suspense>
    )
});



const SignInPageRoute = createRoute({
    getParentRoute: () => rootRouterComponent, 
    path: "/register",
    component: () => (
        <Suspense fallback={<div>loading...</div>}>
            <RegisterPage />
        </Suspense>
    )
});



const UserProfileRoute = createRoute({
    getParentRoute: () => rootRouterComponent, 
    path: "/profile",
    component: () => (
        <Suspense fallback={<div>loading...</div>}>
            <UserProfilePage />
        </Suspense>
    )
});

const rootComponents = rootRouterComponent.addChildren([
    indexRoute, 
    CreateReastauarantRoute,  
    reastaurantCreateRoute,
    Reastaurant_mobileRoute, 
    SettingsRoute,
    verifyOtpRoute, 
    INFO_ROUTE, 
    MyProfileRoute,
    OrdersRoute, 
    AddressesRoute, 
    HistoryRoute, 
    createOrderRoute,
    CreateRoute, 
    BankingAndCompleteRoute, 
    ResgisterationPageRoute, 
    FrontendComponentRoute, 
    SignInPageRoute, 
    loginPageRoute,
    UserProfileRoute
]);

const routerComponent = createRouter({ routeTree: rootComponents });

export default routerComponent;