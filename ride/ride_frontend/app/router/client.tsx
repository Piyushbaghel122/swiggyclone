"use client";

import { useState, useEffect } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

export default function ClientRouter() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <RouterProvider router={router} />;
}