import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const rootReastaurant = createRootRoute();

// Lazy load all pages
const PizzaPage = lazy(() => import("../../../pages/pages/pizzaPage"));
const NorthIndia = lazy(() => import("../../../pages/pages/northInndia"));
const BurgerPage = lazy(() => import("../../../pages/pages/BurgerPage"));
const BiryaniPage = lazy(() => import("../../../pages/pages/binyariPage")); 
const NoodlesPage = lazy(() => import("../../../pages/pages/NoodlesPage"));
const CakesPage = lazy(() => import("../../../pages/pages/CakesPage"));
const ChinesePage = lazy(() => import("../../../pages/pages/ChinesePage"));
const DosaPage = lazy(() => import("../../../pages/pages/DosaPag"));
const IceCreamPage = lazy(() => import("../../../pages/pages/IceCreamPage"));
const PastaPage = lazy(() => import("../../../pages/pages/PastaPage"));
const RollsPage = lazy(() => import("../../../pages/pages/RollsPage"));
const SaladPage = lazy(() => import("../../../pages/pages/SaladPage"));
const ShakesPage = lazy(() => import("../../../pages/pages/ShakesPage"));

// Create routes
const pizzaRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/pizza",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><PizzaPage /></Suspense>
});

const northIndiaRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/north-india",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><NorthIndia /></Suspense>
});

const burgerRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/burger",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><BurgerPage /></Suspense>
});

const biryaniRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/biryani",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><BiryaniPage /></Suspense>
});

const noodlesRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/noodles",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><NoodlesPage /></Suspense>
});

const cakesRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/cakes",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><CakesPage /></Suspense>
});

const chineseRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/chinese",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><ChinesePage /></Suspense>
});

const dosaRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/dosa",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><DosaPage /></Suspense>
});

const iceCreamRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/ice-cream",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><IceCreamPage /></Suspense>
});

const pastaRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/pasta",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><PastaPage /></Suspense>
});

const rollsRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/rolls",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><RollsPage /></Suspense>
});

const saladRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/salad",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><SaladPage /></Suspense>
});

const shakesRoute = createRoute({
    getParentRoute: () => rootReastaurant,
    path: "/category/shakes",
    component: () => <Suspense fallback={<div className="p-8 text-center">Loading...</div>}><ShakesPage /></Suspense>
});

const routeTree = rootReastaurant.addChildren([
    pizzaRoute,
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
]);

export const Reastaurant = createRouter({
    routeTree
});

export default Reastaurant;
