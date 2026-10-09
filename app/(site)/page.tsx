import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Meisterworks — Maatwerk in staal & glas" },
  description:
    "Elke deur wordt volledig naar uw wensen ontworpen en met de hand vervaardigd, van eerste schets tot montage.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePage />;
}
