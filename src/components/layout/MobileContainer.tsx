import React from "react";

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileContainer({ children, className = "" }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-[#f3f4f6] flex justify-center">
      <div
        className={`w-full max-w-[500px] min-h-screen bg-white shadow-xl flex flex-col relative border-x border-zinc-100 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
