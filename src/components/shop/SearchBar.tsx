"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search smartphones by name, brand, or color...",
  className = "",
}: SearchBarProps) {
  return (
    <div
      className={`relative flex items-center h-[44px] rounded-full border border-zinc-200 bg-white px-3.5 shadow-[0_1px_3px_rgba(20,14,50,0.03)] focus-within:border-[#712CDC] focus-within:ring-2 focus-within:ring-[#712CDC]/10 transition-all ${className}`}
    >
      <Search className="h-[18px] w-[18px] text-zinc-400 shrink-0 mr-2" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 outline-none border-none ring-0 focus:ring-0 focus:outline-none"
      />
      {value.trim() && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search input"
          className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
