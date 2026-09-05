import React from "react";
import { ProductSpecs as SpecsModel } from "@/modules/catalog/types";
import { Cpu, Smartphone, Camera, Battery, Shield, Layers } from "lucide-react";

interface ProductSpecsProps {
  specs: SpecsModel;
  keyFeatures: string[];
}

export function ProductSpecs({ specs, keyFeatures }: ProductSpecsProps) {
  const specItems = [
    { label: "Display", value: specs.display, icon: Smartphone },
    { label: "Processor", value: specs.processor, icon: Cpu },
    { label: "Camera", value: specs.camera, icon: Camera },
    { label: "Battery", value: specs.battery, icon: Battery },
    { label: "OS", value: specs.os, icon: Layers },
    { label: "Warranty", value: specs.warranty, icon: Shield },
  ];

  return (
    <div className="flex flex-col gap-4 py-3 border-t border-zinc-100">
      {/* Key Highlights */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
          Key Highlights
        </h4>
        <ul className="flex flex-col gap-1.5">
          {keyFeatures.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs text-zinc-700 leading-relaxed"
            >
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#712CDC] shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Detailed Specs Grid */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
          Technical Specifications
        </h4>
        <div className="grid grid-cols-1 gap-2 rounded-2xl border border-zinc-200/80 bg-[#fafafa] p-3">
          {specItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-2.5 py-1.5 border-b border-zinc-200/50 last:border-none"
              >
                <Icon className="h-4 w-4 text-[#712CDC] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="block text-[11px] text-zinc-400 font-medium">
                    {item.label}
                  </span>
                  <span className="block text-xs font-semibold text-zinc-800">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
