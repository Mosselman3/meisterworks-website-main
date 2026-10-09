import { Configurator } from "@/components/configurator/Configurator";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Configurator",
  description:
    "Stel uw stalen deur samen: afmeting, vlakverdeling, glas, kleur en sluitwerk.",
  alternates: { canonical: "/configurator" },
};

export default function ConfiguratorPage() {
  return (
    <Suspense>
      <Configurator />
    </Suspense>
  );
}
