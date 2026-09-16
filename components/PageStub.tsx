import type { ReactNode } from "react";

export function PageStub({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-[var(--max-width)] flex-1 px-7 py-[72px]">
      <p className="mb-4 text-[13px] font-medium tracking-[0.16em] text-[var(--muted)] uppercase">
        {kicker}
      </p>
      <h1 className="font-serif-display mb-4 max-w-[720px] text-[clamp(30px,4.4vw,46px)] leading-[1.15] font-medium">
        {title}
      </h1>
      <p className="max-w-[560px] text-[16px] leading-7 text-[oklch(0.42_0.008_60)]">
        Deze pagina volgt het design en krijgt in een volgende fase de volledige
        inhoud en functionaliteit.
      </p>
      {children}
    </main>
  );
}
