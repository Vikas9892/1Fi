export interface AffordabilityEvaluation {
  availableLimit: number;
  purchaseAmount: number;
  isEligible: boolean;
  remainingLimit: number;
  shortfall: number;
  utilizationPercentage: number;
  statusMessage: string;
}

export interface LimitConfig {
  defaultLimit: number;
  presetLimits: number[];
}
