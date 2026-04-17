'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--brand-red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Something went wrong</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-teal text-white font-medium text-sm hover:bg-brand-teal-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
