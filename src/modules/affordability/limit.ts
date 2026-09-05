import { AffordabilityEvaluation } from "./types";
import { formatINR } from "../emi/calculator";

export const DEFAULT_MOCK_LIMIT = 100000; // ₹1,00,000

export const PRESET_MOCK_LIMITS = [
  { label: "₹50,000 (Limit Test)", value: 50000 },
  { label: "₹1,00,000 (Default)", value: 100000 },
  { label: "₹1,75,000 (High Limit)", value: 175000 },
];

/**
 * Pure evaluation function for purchase limit eligibility.
 * Transparently checks if the user's estimated mutual fund backed limit covers the purchase amount.
 */
export function evaluateAffordability(
  purchaseAmount: number,
  availableLimit: number = DEFAULT_MOCK_LIMIT
): AffordabilityEvaluation {
  const safeAmount = Math.max(0, purchaseAmount);
  const safeLimit = Math.max(0, availableLimit);

  const isEligible = safeAmount <= safeLimit;
  const remainingLimit = isEligible ? safeLimit - safeAmount : 0;
  const shortfall = isEligible ? 0 : safeAmount - safeLimit;

  const utilizationPercentage =
    safeLimit > 0
      ? Math.min(100, Math.round((safeAmount / safeLimit) * 100))
      : 100;

  let statusMessage: string;
  if (isEligible) {
    statusMessage = `You can proceed • Remaining limit: ${formatINR(remainingLimit)}`;
  } else {
    statusMessage = `${formatINR(shortfall)} more limit required to complete this purchase`;
  }

  return {
    availableLimit: safeLimit,
    purchaseAmount: safeAmount,
    isEligible,
    remainingLimit,
    shortfall,
    utilizationPercentage,
    statusMessage,
  };
}
