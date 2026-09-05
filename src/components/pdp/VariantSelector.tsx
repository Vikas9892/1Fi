"use client";

import React from "react";
import { Check } from "lucide-react";

interface VariantSelectorProps {
  availableStorages: string[];
  selectedStorage: string;
  onSelectStorage: (storage: string) => void;
  availableColors: { name: string; hex: string }[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export function VariantSelector({
  availableStorages,
  selectedStorage,
  onSelectStorage,
  availableColors,
  selectedColor,
  onSelectColor,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-col gap-4 border-y border-zinc-100 py-4">
      {/* Storage Options */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Select Storage
          </span>
          <span className="text-xs font-bold text-zinc-900">
            {selectedStorage}
          </span>
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="Storage capacity"
        >
          {availableStorages.map((storage) => {
            const isSelected = selectedStorage === storage;
            return (
              <button
                key={storage}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectStorage(storage)}
                className={`flex-1 min-w-[80px] rounded-xl border py-2.5 px-3 text-center text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#712CDC] bg-[#fbf9ff] text-[#712CDC] shadow-xs ring-1 ring-[#712CDC]"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                {storage}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Options */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Select Color
          </span>
          <span className="text-xs font-bold text-zinc-900">
            {selectedColor}
          </span>
        </div>
        <div
          className="flex flex-wrap gap-2.5"
          role="radiogroup"
          aria-label="Device color"
        >
          {availableColors.map((color) => {
            const isSelected = selectedColor === color.name;
            return (
              <button
                key={color.name}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectColor(color.name)}
                className={`group flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#712CDC] bg-[#fbf9ff] text-[#712CDC] shadow-xs ring-1 ring-[#712CDC]"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/15 shadow-xs flex items-center justify-center shrink-0"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <Check
                      className={`h-2.5 w-2.5 ${
                        color.hex.toLowerCase() === "#ffffff" ||
                        color.hex.toLowerCase() === "#f2efe9"
                          ? "text-zinc-900"
                          : "text-white"
                      }`}
                    />
                  )}
                </span>
                <span className="truncate">{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
