"use client";

export default function Error({ error: _error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
      <p>Something went wrong while loading this page.</p>
      <button className="text-sm underline" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
