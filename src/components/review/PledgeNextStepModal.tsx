"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Building2,
  FileCheck,
  Sparkles,
  X,
  ArrowRight,
} from "lucide-react";
import { formatINR } from "@/modules/emi/calculator";

interface PledgeNextStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  monthlyEmi: number;
  tenureMonths: number;
  partnerLender: string;
}

export function PledgeNextStepModal({
  isOpen,
  onClose,
  productName,
  monthlyEmi,
  tenureMonths,
  partnerLender,
}: PledgeNextStepModalProps) {
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  if (!isOpen) return null;

  const steps = [
    {
      title: "1. PAN & Portfolio Discovery",
      desc: "Instantly fetch your mutual fund portfolio value via CAMS / KFintech using registered mobile number.",
      icon: FileCheck,
    },
    {
      title: "2. Select Mutual Fund Units",
      desc: "Choose equity or debt mutual fund units to pledge. Units remain invested and continue earning market returns.",
      icon: Sparkles,
    },
    {
      title: "3. Digital Lien Authorization",
      desc: "One-click digital OTP authorization on MFCentral. Zero branch visits or physical paperwork.",
      icon: ShieldCheck,
    },
    {
      title: "4. Partner Disbursement & Delivery",
      desc: `${partnerLender} finances the purchase with 0% interest. Your ${productName} is dispatched immediately!`,
      icon: Building2,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pledge-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-3 transition-opacity"
    >
      <div className="w-full max-w-[460px] rounded-3xl bg-white p-5 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ede8ff] text-[#712CDC]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 id="pledge-modal-title" className="text-sm font-bold text-zinc-900">
                {pledgeSuccess ? "Pledge Simulation Successful!" : "Continue to Mutual Fund Pledge"}
              </h3>
              <p className="text-[11px] text-zinc-500">
                1Fi Paperless Onboarding Journey
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        {pledgeSuccess ? (
          <div className="py-6 text-center flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h4 className="text-base font-extrabold text-zinc-900">
              Order Simulated Successfully!
            </h4>
            <p className="max-w-[34ch] text-xs text-zinc-600 leading-relaxed">
              Your mutual fund units have been marked for lien. Monthly EMI of{" "}
              <strong className="text-[#712CDC]">{formatINR(monthlyEmi)}</strong> for{" "}
              <strong>{tenureMonths} months</strong> has been scheduled with {partnerLender}.
            </p>

            <div className="mt-4 w-full rounded-2xl bg-zinc-50 p-3.5 text-left text-xs border border-zinc-200/80">
              <span className="block text-[11px] font-semibold text-zinc-400">
                Assessment Environment Note:
              </span>
              <p className="mt-1 text-[11px] text-zinc-600">
                This completes the mocked end-to-end checkout flow. In production, this handoff connects to 1Fi&apos;s regulated RTA lien-marking and e-mandate system.
              </p>
            </div>

            <Link
              href="/shop"
              onClick={onClose}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#712CDC] py-3 text-xs font-bold text-white shadow-md hover:bg-[#5e24b7] transition-all"
            >
              <span>Return to 1Fi Marketplace</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="py-3 flex flex-col gap-3">
            <div className="rounded-xl bg-purple-50/60 p-3 text-xs text-purple-900 border border-purple-100">
              <span className="font-bold">Estimated Monthly EMI: </span>
              <span className="font-extrabold text-[#712CDC]">
                {formatINR(monthlyEmi)}/month
              </span>{" "}
              for {tenureMonths} months (0% interest).
            </div>

            <div className="flex flex-col gap-2.5">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-zinc-100 bg-[#fafafa] p-2.5"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-2xs text-[#712CDC] shrink-0 mt-0.5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-zinc-900">
                        {step.title}
                      </h5>
                      <p className="text-[11px] text-zinc-500 leading-snug mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="mt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setPledgeSuccess(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#712CDC] py-3 text-xs font-bold text-white shadow-md shadow-[#712CDC]/25 hover:bg-[#5e24b7] active:scale-98 transition-all cursor-pointer"
              >
                <span>Simulate Mutual Fund Pledge</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-center text-xs font-semibold text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
              >
                Cancel & Review Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
