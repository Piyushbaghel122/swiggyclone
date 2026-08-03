"use client";

import React from "react";
import dynamic from "next/dynamic";

const ClientRouter = dynamic(() => import("../components/ClientRouter"), { ssr: false });

export default function Page() {
  return <ClientRouter />;
}
