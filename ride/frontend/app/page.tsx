"use client";

import dynamic from "next/dynamic";

const ClientRouter = dynamic(() => import("./router/ClientRouter"), { ssr: false });

export default function App() {
  return <ClientRouter />;
}