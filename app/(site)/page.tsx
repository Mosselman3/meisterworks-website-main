import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Meisterworks — Maatwerk in staal & glas",
  description:
    "Elke deur wordt volledig naar uw wensen ontworpen en met de hand vervaardigd — van eerste schets tot montage.",
};

export default function Home() {
  return <HomePage />;
}
