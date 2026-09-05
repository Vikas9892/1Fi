import React from "react";
import { AppShell } from "./AppShell";

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  showDesktopNav?: boolean;
}

/**
 * Responsive App Frame
 * Adapts to full desktop/tablet width while preserving 1Fi's mobile design on mobile screens.
 */
export function MobileContainer({
  children,
  className = "",
  showDesktopNav = true,
}: MobileContainerProps) {
  return (
    <AppShell className={className} showDesktopNav={showDesktopNav}>
      {children}
    </AppShell>
  );
}
