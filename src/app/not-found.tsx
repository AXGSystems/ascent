import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[var(--bg-secondary)] px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-navy flex items-center justify-center shadow-lg shadow-brand-teal/20 mx-auto mb-6">
          <span className="text-white font-bold text-2xl">A$</span>
        </div>
        <h1 className="text-6xl font-bold tabular-nums text-[var(--text-primary)] mb-2">404</h1>
        <p className="text-lg font-medium text-[var(--text-secondary)] mb-1">Page not found</p>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-teal text-white font-medium text-sm hover:bg-brand-teal-dark transition-colors shadow-lg shadow-brand-teal/20"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
