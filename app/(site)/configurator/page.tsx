import { Configurator } from "@/components/configurator/Configurator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurator — Meisterworks",
};

export default function ConfiguratorPage() {
  return <Configurator />;
}
