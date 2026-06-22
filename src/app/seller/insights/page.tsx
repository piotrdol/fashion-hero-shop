import Link from "next/link";

export default function SellerInsightsPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-card border border-border rounded-md p-10">
          <div className="label-eyebrow text-charcoal/60 mb-4">Quality Score · Insights</div>
          <h1 className="text-2xl font-normal tracking-tight text-charcoal mb-3">
            Dziękujemy za zainteresowanie!
          </h1>
          <p className="text-[14px] text-charcoal/70 leading-relaxed mb-8">
            Pełne Insights Konkurencji są w trakcie przygotowania. Twój klik został zarejestrowany — damy Ci znać jako pierwszemu, gdy funkcja będzie gotowa.
          </p>
          <Link
            href="/seller/dashboard"
            className="inline-flex items-center justify-center bg-charcoal text-white rounded h-11 px-6 text-[12px] font-medium uppercase tracking-[0.5px] hover:opacity-90 transition-opacity"
          >
            Wróć do panelu
          </Link>
        </div>
      </div>
    </div>
  );
}
