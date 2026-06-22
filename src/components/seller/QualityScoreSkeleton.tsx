export function QualityScoreSkeleton() {
  return (
    <div className="bg-card border border-border rounded-md p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="h-3 w-32 bg-muted rounded animate-pulse" />
        <div className="h-3 w-12 bg-muted rounded animate-pulse" />
      </div>
      <div className="h-12 w-40 bg-muted rounded animate-pulse mb-3" />
      <div className="h-3 w-56 bg-muted rounded animate-pulse mb-6" />
      <div className="h-10 w-full bg-muted rounded animate-pulse" />
    </div>
  );
}
