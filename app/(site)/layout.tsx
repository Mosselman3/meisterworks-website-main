import type { ReactNode } from "react";
import { ResumeConfigurator } from "@/components/configurator/ResumeConfigurator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      <SiteFooter />
      <ResumeConfigurator />
    </>
  );
}
