import { createRoute, createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const CitiesReastaurantRootRoute = createRootRoute();
const PizzaReastaurant = lazy(() => import("../pages/PizzaReastaurant"));
const BelginPage = lazy(() => import("../pages/Belgin_page"));
const Bikanervala = lazy(() => import("../pages/Bikanervala"));
const BiryaniPage = lazy(() => import("../pages/BiryaniPage"));
const BurgerPage = lazy(() => import("../pages/BurgerPage"));
const KFCPage = lazy(() => import("../pages/KFCPage"));
const Mcdonals = lazy(() => import("../pages/Mcdonals"));
const SubwayPage = lazy(() => import("../pages/SubwayPage"));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCityRestaurantRoute = (path: string, Component: any) => createRoute({
    getParentRoute: () => CitiesReastaurantRootRoute,
    path: `/restaurants/${path}`,
    component: () => (
        <Suspense fallback={<div>Loading...</div>}>
            <Component />
        </Suspense>
    )
});

const PizzaReastaurantRoute = createCityRestaurantRoute("1-la-pino-z-pizza", PizzaReastaurant);
const BelginPageRoute = createCityRestaurantRoute("5-belgian-waffle-co-", BelginPage);
const BikanervalaRoute = createCityRestaurantRoute("4-bikanervala", Bikanervala);
const BiryaniPageRoute = createCityRestaurantRoute("7-behrouz-biryani", BiryaniPage);
const BurgerPageRoute = createCityRestaurantRoute("3-the-burger-club", BurgerPage);
const KFCPageRoute = createCityRestaurantRoute("8-kfc", KFCPage);
const McdonalsRoute = createCityRestaurantRoute("2-mcdonald-s", Mcdonals);
const SubwayPageRoute = createCityRestaurantRoute("6-subway", SubwayPage);

const CitiesReastaurantRoute = CitiesReastaurantRootRoute.addChildren([
    PizzaReastaurantRoute,
    BelginPageRoute,
    BikanervalaRoute,
    BiryaniPageRoute,
    BurgerPageRoute,
    KFCPageRoute,
    McdonalsRoute,
    SubwayPageRoute
]);

export const CitiesReastaurantRouter = createRouter({
    routeTree: CitiesReastaurantRoute,
    defaultNotFoundComponent: () => {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Inner Route 404 - Page Not Found</p>
            </div>
        );
    }
});

export default function CitiesRestaurantApp() {
    return (
        <RouterProvider router={CitiesReastaurantRouter} />
    );
}
