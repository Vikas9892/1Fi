import React from "react";
import { SearchX, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = "No products found",
  message = "Try adjusting your search query or selecting a different brand filter.",
  actionLabel = "Clear Filters",
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 py-10 text-center shadow-[0_2px_6px_rgba(20,14,50,0.04)] ${className}`}
    >
      <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ede8ff] text-[#712CDC]">
        <SearchX className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-zinc-900">{title}</h3>
      <p className="mt-1.5 max-w-[32ch] text-xs text-zinc-500 leading-relaxed">
        {message}
      </p>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5 text-zinc-500" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
