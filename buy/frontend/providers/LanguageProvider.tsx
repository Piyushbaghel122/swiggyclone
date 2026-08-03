"use client";

import "../lib/i18n";
import WebProviders from "@/web/providers";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WebProviders>{children}</WebProviders>;
}
