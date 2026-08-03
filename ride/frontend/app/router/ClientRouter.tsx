"use client";

import router from "./router";
import { RouterProvider } from "@tanstack/react-router";
import { Provider } from "react-redux";
import { store } from "../store/store";

// Suppress the React 18 useInsertionEffect warning that Next.js forces into a red error screen.
// This is a known harmless dev-time issue with TanStack Router in Next.js.
if (typeof console !== "undefined") {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string") {
      if (args[0].includes("useInsertionEffect must not schedule updates")) return;
      if (args[0].includes("hasn't mounted yet")) return;
    }
    originalConsoleError(...args);
  };
}

export default function ClientRouter() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
