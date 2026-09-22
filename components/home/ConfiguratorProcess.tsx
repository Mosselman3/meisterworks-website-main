import Link from "next/link";
import { CONFIGURATOR_STEPS } from "@/lib/content";
import { ROUTES } from "@/lib/site";

export function ConfiguratorProcess() {
  return (
    <section className="mx-auto max-w-[var(--max-width)] px-7 py-[100px]">
      <div className="mx-auto mb-12 max-w-[640px] text-center">
        <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
          Configurator
        </div>
        <h2 className="font-serif-display m-0 mb-5 text-[clamp(28px,3.6vw,40px)] font-normal">
          Stel uw eigen deur samen.
        </h2>
        <p className="m-0 text-[16px] leading-[1.7] text-[oklch(0.4_0.008_60)]">
          Vier stappen van eerste keuze tot aanvraag. Liever persoonlijk
          meedenken? Plan een vrijblijvend adviesgesprek.
        </p>
      </div>

      <ol className="home-config-process mb-16">
        {CONFIGURATOR_STEPS.map((step) => (
          <li key={step.num} className="home-config-step">
            <div className="home-config-step-marker" aria-hidden="true">
              <span className="home-config-num font-serif-display">{step.num}</span>
            </div>
            <div className="home-config-step-body">
              <h3 className="m-0 mb-2 text-[16px] font-normal text-[oklch(0.2_0.008_60)]">
                {step.title}
              </h3>
              <p className="m-0 text-[14px] leading-[1.6] text-[oklch(0.42_0.008_60)]">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="home-config-cta">
        <Link
          href={ROUTES.configurator}
          className="btn-dark border border-transparent"
        >
          Open de configurator
        </Link>
        <Link href={ROUTES.afspraak} className="btn-outline">
          Adviesgesprek plannen
        </Link>
      </div>
    </section>
  );
}
