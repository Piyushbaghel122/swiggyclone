"use client";
import { RouterProvider } from "@tanstack/react-router";
import router from "@/app/router/pageRoute";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent SSR

  return (
    <RouterProvider router={router} />
  );
}
