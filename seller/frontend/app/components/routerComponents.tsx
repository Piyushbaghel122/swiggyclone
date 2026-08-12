import { createRootRoute, createRouter, createRoute, lazyRouteComponent } from "@tanstack/react-router";

// create root route 
const rootRouterComponent = createRootRoute();

import HomeComponent from "./ui/Homecomponent";

const MyProfileRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/myprofile",
    component: lazyRouteComponent(() => import("./myprofile/myprofile"))
});

const OptVerifyRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/mobile",
    component: lazyRouteComponent(() => import("./ui/frontnedCompoment/page/OptVerfiy"))
});

const LoginUserRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/login",
    component: lazyRouteComponent(() => import("./ui/frontnedCompoment/page/loginPage"))
});

const FrontendComponentRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/",
    component: lazyRouteComponent(() => import("./ui/frontnedCompoment/frontendComponent"))
});

const SignInPageRoute = createRoute({
    getParentRoute: () => rootRouterComponent, 
    path: "/register",
    component: lazyRouteComponent(() => import("./ui/frontnedCompoment/page/registerPage"))
});

const SellerDashboardRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/seller",
    component: lazyRouteComponent(() => import("../constants/pages/sellerDashboard/sellerDashbaord"))
});

const CreateReastauarantRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/reastaurant/registeration",
    component: lazyRouteComponent(() => import("../features/reastaurant/pages/regiterReastaurant"))
});

const StepByStepRoute = createRoute({
    getParentRoute: () => rootRouterComponent,
    path: "/reastaurant/stepbystep",
    component: lazyRouteComponent(() => import("../features/reastaurant/pages/setBySet"))
});

const rootComponents = rootRouterComponent.addChildren([ 
    MyProfileRoute,
    OptVerifyRoute,  
    FrontendComponentRoute, 
    SignInPageRoute,    
    LoginUserRoute,
    SellerDashboardRoute,
    CreateReastauarantRoute,
    StepByStepRoute
]);

const routerComponent = createRouter({ routeTree: rootComponents });

export default routerComponent;