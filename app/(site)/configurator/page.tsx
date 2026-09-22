import { Configurator } from "@/components/configurator/Configurator";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Configurator — Meisterworks",
};

export default function ConfiguratorPage() {
  return (
    <Suspense>
      <Configurator />
    </Suspense>
  );
}
