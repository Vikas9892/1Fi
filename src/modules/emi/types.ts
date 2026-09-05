export type TenureMonths = 3 | 6 | 9 | 12 | 18 | 24 | 36;

export interface EmiCalculationInput {
  principal: number;
  tenureMonths: number;
  annualInterestRate: number; // e.g., 0 for 0% No-cost, 12 for 12% p.a.
  cashback?: number;
  processingFee?: number;
}

export interface EmiCalculationResult {
  principal: number;
  tenureMonths: number;
  annualInterestRate: number;
  isZeroCost: boolean;
  monthlyEmi: number;
  totalInterest: number;
  totalPayable: number;
  effectiveTotalAfterCashback: number;
  cashback: number;
  processingFee: number;
}

export interface EmiPlanConfig {
  tenureMonths: TenureMonths;
  annualInterestRate: number;
  cashbackPercent?: number; // e.g., 2% cashback
  cashbackFixed?: number;
  processingFee: number;
  recommendationReason?: string;
}

export interface EmiPlan extends EmiCalculationResult {
  id: string;
  isRecommended: boolean;
  recommendationTag?: string;
  recommendationReason?: string;
}
