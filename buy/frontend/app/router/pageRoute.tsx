import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const UIPage = lazy(() => import("../components/ui/UIPage"));
const AuthRouter = lazy(() => import("../features/auth/routerAuth/AuthRouter"));
const FrontendDashbaord = lazy(() => import("../components/ui/frontenddashbaord"));
const UserProfile = lazy(() => import("../features/profile/ProfileRouter/profileRoute"));
const CartRouter = lazy(() => import("../features/cart/CartRoute/cartRouter"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoadingPage = lazy(() => import("../features/cart/components/loadingComponent/LoadingPage"));

const OfferPage = lazy(()=> import("../pages/OfferPage"));
const HelpCenter = lazy(()=> import("../pages/HelpCenter"));

// Category Pages
const PizzaPage = lazy(() => import("../pages/pages/pizzaPage"));
const NorthIndia = lazy(() => import("../pages/pages/northInndia"));
const BurgerPage = lazy(() => import("../pages/pages/BurgerPage"));
const BiryaniPage = lazy(() => import("../pages/pages/binyariPage")); 
const NoodlesPage = lazy(() => import("../pages/pages/NoodlesPage"));
const CakesPage = lazy(() => import("../pages/pages/CakesPage"));
const ChinesePage = lazy(() => import("../pages/pages/ChinesePage"));
const DosaPage = lazy(() => import("../pages/pages/DosaPag"));
const IceCreamPage = lazy(() => import("../pages/pages/IceCreamPage"));
const PastaPage = lazy(() => import("../pages/pages/PastaPage"));
const RollsPage = lazy(() => import("../pages/pages/RollsPage"));
const SaladPage = lazy(() => import("../pages/pages/SaladPage"));
const ShakesPage = lazy(() => import("../pages/pages/ShakesPage"));
const ReastauarantRootRoute  = lazy(() => import("../features/reastaurant/reastaurantRoute/route/reastautarantRouter"));
const CitiesReastaurantRouter = lazy(()=> import("../features/reastaurant/citis_reastaurant/route/CitiesReastaurantRoute.tsx"));

const rootRoute = createRootRoute();

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <UIPage />
        </Suspense>
    ),
});


const FrontendDashbaordRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <FrontendDashbaord />
        </Suspense>
    ),
});



const AuthRouterRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : "/auth/$",
    component : () => (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthRouter />
        </Suspense>
    )
});

const UserProfileRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : "/user/$",
    component : () => (
        <Suspense fallback={<div>Loading...</div>}>
            <UserProfile />
        </Suspense>
    )
});

const CartRouterRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : "/cart/$",
    component : () => (
        <Suspense fallback={<div>Loading...</div>}>
            <CartRouter />
        </Suspense>
    )
});

const loadingPageRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : "/loading",
    component : () => (
        <Suspense fallback={<div>Loading...</div>}>
            <LoadingPage />
        </Suspense>
    )
});

const offerPageRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : "/offers",
    component : () => (
        <Suspense fallback={<div>Loading...</div>}>
            <OfferPage />
        </Suspense>
    )
});

const helpCenterRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : "/help",
    component : () => (
        <Suspense fallback={<div>Loading...</div>}>
            <HelpCenter />
        </Suspense>
    )
});

// Category Routes
const createCategoryRoute = (path: string, Component: React.LazyExoticComponent<any>) => createRoute({
    getParentRoute: () => rootRoute,
    path: `/category/${path}`,
    component: () => (
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
            <Component />
        </Suspense>
    )
});

const ReastauarantRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : "/brand/$",
    component : () => (
        <Suspense fallback={<div>Loading...</div>}>
            <ReastauarantRootRoute />
        </Suspense>
    )
});

// /restaurants/{id}-{name}
const citiesReastaurantRoute = createRoute({
    getParentRoute : () => rootRoute,
    path : "/restaurants/$",
    component : () => (
        <Suspense fallback={<div>Loading...</div>}>
            <CitiesReastaurantRouter />
        </Suspense>
    )
});

const pizzaPageRoute = createCategoryRoute("pizza", PizzaPage);
const northIndiaRoute = createCategoryRoute("north-india", NorthIndia);
const burgerRoute = createCategoryRoute("burger", BurgerPage);
const biryaniRoute = createCategoryRoute("biryani", BiryaniPage);
const noodlesRoute = createCategoryRoute("noodles", NoodlesPage);
const cakesRoute = createCategoryRoute("cakes", CakesPage);
const chineseRoute = createCategoryRoute("chinese", ChinesePage);
const dosaRoute = createCategoryRoute("dosa", DosaPage);
const iceCreamRoute = createCategoryRoute("ice-cream", IceCreamPage);
const pastaRoute = createCategoryRoute("pasta", PastaPage);
const rollsRoute = createCategoryRoute("rolls", RollsPage);
const saladRoute = createCategoryRoute("salad", SaladPage);
const shakesRoute = createCategoryRoute("shakes", ShakesPage);


const routeTree = rootRoute.addChildren([
    indexRoute, 
    AuthRouterRoute, 
    FrontendDashbaordRoute, 
    UserProfileRoute, 
    CartRouterRoute, 
    loadingPageRoute, 
    offerPageRoute, 
    helpCenterRoute, 
    
    // Category Routes
    pizzaPageRoute,
    northIndiaRoute,
    burgerRoute,
    biryaniRoute,
    noodlesRoute,
    cakesRoute,
    chineseRoute,
    dosaRoute,
    iceCreamRoute,
    pastaRoute,
    rollsRoute,
    saladRoute,
    shakesRoute

    ,
    // brand
    ReastauarantRoute ,
    citiesReastaurantRoute        
]);

const router = createRouter({ 
    routeTree,
    defaultNotFoundComponent: () => {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>404 - Page Not Found</p>
            </div>
        );
    }
});

export default router;
