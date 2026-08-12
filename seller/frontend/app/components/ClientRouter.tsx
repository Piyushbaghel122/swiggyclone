/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { RouterProvider } from "@tanstack/react-router";
import routerComponent from "./routerComponents";

import { useState, useEffect } from "react";

export default function ClientRouter() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  
  return <RouterProvider router={routerComponent} />;
}
