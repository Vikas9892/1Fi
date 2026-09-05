"use client";

import { useState, useMemo } from "react";
import {
  DEFAULT_MOCK_LIMIT,
  PRESET_MOCK_LIMITS,
  evaluateAffordability,
} from "@/modules/affordability/limit";
import { AffordabilityEvaluation } from "@/modules/affordability/types";

export function useAffordability(purchaseAmount: number) {
  const [availableLimit, setAvailableLimit] = useState<number>(DEFAULT_MOCK_LIMIT);

  const evaluation: AffordabilityEvaluation = useMemo(() => {
    return evaluateAffordability(purchaseAmount, availableLimit);
  }, [purchaseAmount, availableLimit]);

  return {
    availableLimit,
    setAvailableLimit,
    evaluation,
    presets: PRESET_MOCK_LIMITS,
  };
}
