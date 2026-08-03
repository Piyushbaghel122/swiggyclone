import { lazy , Suspense } from "react";

const PhonePage = lazy(() => import("../pages/phonePage"));

export function AuthPhoneRoute() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PhonePage />
        </Suspense>
    );
}
