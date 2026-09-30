import type { Metadata } from "next";
import { QuotePortal } from "@/components/portal/QuotePortal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Uw offerte — Meisterworks",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function QuotePortalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <QuotePortal token={token} />;
}
