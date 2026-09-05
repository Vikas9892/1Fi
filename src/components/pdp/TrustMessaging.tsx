import React from "react";
import { ShieldCheck, TrendingUp, Lock, Building2 } from "lucide-react";

interface TrustMessagingProps {
  partnerLender: string;
}

export function TrustMessaging({ partnerLender }: TrustMessagingProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-purple-100 bg-[#fbf9ff] p-4 text-xs">
      <div className="flex items-center gap-2 text-purple-900 font-bold">
        <ShieldCheck className="h-4 w-4 text-[#712CDC]" />
        <span>1Fi Financial Guarantee & Trust Model</span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 text-[11.5px] text-zinc-600">
        <div className="flex items-start gap-2">
          <TrendingUp className="h-4 w-4 text-[#712CDC] shrink-0 mt-0.5" />
          <p>
            <strong className="text-zinc-800">Your mutual funds stay invested:</strong> Continue
            earning market compounding returns while your purchase is financed via 0% EMI.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Lock className="h-4 w-4 text-[#712CDC] shrink-0 mt-0.5" />
          <p>
            <strong className="text-zinc-800">Secure Digital Lien:</strong> Units are safely
            lien-marked through SEBI-registered RTAs (CAMS, KFintech, MFCentral).
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Building2 className="h-4 w-4 text-[#712CDC] shrink-0 mt-0.5" />
          <p>
            <strong className="text-zinc-800">Regulated Financing Partner:</strong> Loan sanctioning
            and credit underwriting is provided by our RBI-registered NBFC partner,{" "}
            <span className="font-semibold text-purple-950">{partnerLender}</span>. 1Fi provides the technology and mutual fund pledge integration platform.
          </p>
        </div>
      </div>
    </div>
  );
}
