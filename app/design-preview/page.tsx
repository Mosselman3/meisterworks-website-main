import { notFound } from "next/navigation";
import { DESIGN_PAGES } from "@/lib/design-pages";

export const dynamic = "force-dynamic";

export default function DesignIndexPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const productPages = DESIGN_PAGES.filter((page) =>
    page.nextRoute.startsWith("/deuren/"),
  );
  const mainPages = DESIGN_PAGES.filter(
    (page) => !page.nextRoute.startsWith("/deuren/"),
  );

  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-10 px-7 py-16">
      <header className="flex flex-col gap-3">
        <p className="text-[13px] font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
          Design preview
        </p>
        <h1 className="font-[family-name:var(--font-newsreader)] text-[40px] leading-[1.1] font-medium">
          Original mockups
        </h1>
        <p className="max-w-[520px] text-[15px] leading-6 text-[var(--muted)]">
          These are the unchanged Design Component files. They are available
          only while running <code className="font-mono text-[13px]">npm run dev</code>.
          Next.js routes will replace them as pages are converted.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-[13px] font-semibold tracking-[0.06em] text-[var(--muted)] uppercase">
          Main pages
        </h2>
        <ul className="overflow-hidden rounded-[18px] border border-[var(--line)] bg-white">
          {mainPages.map((page) => (
            <li
              key={page.file}
              className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-5 py-4 last:border-b-0"
            >
              <div>
                <a
                  href={`/_design/${encodeURIComponent(page.file)}`}
                  className="text-[16px] font-medium"
                >
                  {page.title}
                </a>
                <p className="mt-1 text-[13px] text-[var(--muted)]">{page.file}</p>
              </div>
              <span className="shrink-0 font-mono text-[12px] text-[var(--muted)]">
                {page.nextRoute}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[13px] font-semibold tracking-[0.06em] text-[var(--muted)] uppercase">
          Product pages
        </h2>
        <ul className="overflow-hidden rounded-[18px] border border-[var(--line)] bg-white">
          {productPages.map((page) => (
            <li
              key={page.file}
              className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-5 py-4 last:border-b-0"
            >
              <div>
                <a
                  href={`/_design/${encodeURIComponent(page.file)}`}
                  className="text-[16px] font-medium"
                >
                  {page.title}
                </a>
                <p className="mt-1 text-[13px] text-[var(--muted)]">{page.file}</p>
              </div>
              <span className="shrink-0 font-mono text-[12px] text-[var(--muted)]">
                {page.nextRoute}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
