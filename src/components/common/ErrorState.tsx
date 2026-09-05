import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center ${className}`}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
      <p className="mt-1 max-w-[34ch] text-xs text-zinc-600 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white border border-zinc-200 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50 active:scale-95 transition-all cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5 text-zinc-500" />
          Retry
        </button>
      )}
    </div>
  );
}
