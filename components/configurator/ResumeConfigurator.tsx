"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  dismissConfiguratorResume,
  readConfiguratorDraft,
  resumeDismissedAt,
  subscribeConfiguratorDraft,
  type ConfiguratorDraft,
} from "@/lib/configurator-draft";
import { ROUTES } from "@/lib/site";

export function ResumeConfigurator() {
  const pathname = usePathname();
  const [draft, setDraft] = useState<ConfiguratorDraft | null>(null);
  const [dismissedAt, setDismissedAt] = useState(0);

  useEffect(() => {
    const sync = () => {
      setDraft(readConfiguratorDraft());
      setDismissedAt(resumeDismissedAt());
    };
    sync();
    return subscribeConfiguratorDraft(sync);
  }, []);

  if (!draft || pathname === ROUTES.configurator) return null;
  if (dismissedAt >= draft.savedAt) return null;

  const label = `Hervat deur samenstellen, ${draft.progressPct}% voltooid`;

  return (
    <div data-cfg-resume>
      <Link
        href={ROUTES.configurator}
        data-cfg-resume-link
        aria-label={label}
      >
        <span
          aria-hidden
          data-cfg-resume-fill
          style={{ width: `${draft.progressPct}%` }}
        />
        <span>Hervat deur samenstellen</span>
        <span>{draft.progressPct}%</span>
      </Link>
      <button
        type="button"
        data-cfg-resume-dismiss
        aria-label="Voortgang verbergen"
        onClick={() => dismissConfiguratorResume(draft.savedAt)}
      >
        ×
      </button>
    </div>
  );
}
