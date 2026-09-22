import { REVIEW_COUNT, REVIEW_SCORE } from "@/lib/content";

export function GoogleReviewsRating({
  className = "justify-center",
}: {
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-[18px] tracking-[0.1em] text-[var(--accent)]">
        ★★★★★
      </span>
      <span className="text-[14px] text-[oklch(0.65_0.008_75)]">
        {REVIEW_SCORE} · {REVIEW_COUNT} reviews op Google
      </span>
    </div>
  );
}
