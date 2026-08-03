import { createRoute , createRootRoute , createRouter, RouterProvider } from "@tanstack/react-router";
import { lazy , Suspense } from "react";

const ReastauarantRootRoute = createRootRoute();
const PizzaReastaurant = lazy(()=> import("../pages/pizzaReastaurant"));
const BaskinRobbins = lazy(()=> import("../pages/Baskin_Robbins"));
const Bikanervala = lazy(()=> import("../pages/Bikanervala"));
const BurgerKing = lazy(()=> import("../pages/Burger_King"));
const DominoPizza = lazy(()=> import("../pages/DominoPizza"));
const DunkinDonuts = lazy(()=> import("../pages/Dunkin_Donuts"));
const Haldiram = lazy(()=> import("../pages/Haldiram"));
const KFC = lazy(()=> import("../pages/KFC"));
const PizzaHut = lazy(()=> import("../pages/Pizza_Hut"));
const Starbucks = lazy(()=> import("../pages/Starbucks"));
const Subway = lazy(()=> import("../pages/Subway"));
const TacoBell = lazy(()=> import("../pages/Taco_Bell"));

const pizzaRouter = createRoute({
    getParentRoute : ()=> ReastauarantRootRoute,
    path : "/mcdonald-s",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <PizzaReastaurant />
        </Suspense>
    )
});

const baskinRobbinsRouter = createRoute({
    getParentRoute: () => ReastauarantRootRoute,
    path: "/",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <BaskinRobbins />
        </Suspense>
    )
});

const bikanervalaRouter = createRoute({
    getParentRoute: () => ReastauarantRootRoute,
    path: "/bikanervala",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <Bikanervala />
        </Suspense>
    )
});

const burgerKingRouter = createRoute({
    getParentRoute: () => ReastauarantRootRoute,
    path: "/burger-king",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <BurgerKing />
        </Suspense>
    )
});

const dominoPizzaRouter = createRoute({
    getParentRoute: () => ReastauarantRootRoute,
    path: "/domino-s-pizza",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <DominoPizza />
        </Suspense>
    )
});

const dunkinDonutsRouter = createRoute({
    getParentRoute: () => ReastauarantRootRoute,
    path: "/dunkin-donuts",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <DunkinDonuts />
        </Suspense>
    )
});

const haldiramRouter = createRoute({
    getParentRoute: () => ReastauarantRootRoute,
    path: "/haldiram-s",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <Haldiram />
        </Suspense>
    )
});

const kfcRouter = createRoute({
    getParentRoute: () => ReastauarantRootRoute,
    path: "/kfc",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <KFC />
        </Suspense>
    )
});

const pizzaHutRouter = createRoute({
    getParentRoute: () => ReastauarantRootRoute,
    path: "/pizza-hut",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <PizzaHut />
        </Suspense>
    )
});

const starbucksRouter = createRoute({
    getParentRoute: () => ReastauarantRootRoute,
    path: "/starbucks",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <Starbucks />
        </Suspense>
    )
});

const subwayRouter = createRoute({
    getParentRoute: () => ReastauarantRootRoute,
    path: "/subway",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <Subway />
        </Suspense>
    )
});

const tacoBellRouter = createRoute({
    getParentRoute: () => ReastauarantRootRoute,
    path: "/taco-bell",
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <TacoBell />
        </Suspense>
    )
});

const ReastaurantRoute = ReastauarantRootRoute.addChildren([ 
    pizzaRouter,
    baskinRobbinsRouter,
    bikanervalaRouter,
    burgerKingRouter,
    dominoPizzaRouter,
    dunkinDonutsRouter,
    haldiramRouter,
    kfcRouter,
    pizzaHutRouter,
    starbucksRouter,
    subwayRouter,
    tacoBellRouter
]);

const ReastauarantRouter = createRouter({
    routeTree : ReastaurantRoute,
    basepath: '/brand'
});

export default function RestaurantApp() {
    return (
        <RouterProvider router={ReastauarantRouter} />
    );
}
