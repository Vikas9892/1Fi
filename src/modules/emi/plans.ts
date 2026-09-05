import { calculateEmi } from "./calculator";
import { EmiPlan, EmiPlanConfig } from "./types";

/**
 * Default EMI plans supported on 1Fi Marketplace.
 * Configured so that adding 9, 18, or 36 months requires only updating config arrays.
 */
export const DEFAULT_PLAN_CONFIGS: EmiPlanConfig[] = [
  {
    tenureMonths: 3,
    annualInterestRate: 0,
    processingFee: 0,
    cashbackPercent: 1.5, // 1.5% cashback on 3m
  },
  {
    tenureMonths: 6,
    annualInterestRate: 0,
    processingFee: 0,
    cashbackPercent: 2, // 2% cashback
    recommendationReason: "Most popular: 0% Interest with optimal monthly affordability",
  },
  {
    tenureMonths: 12,
    annualInterestRate: 0,
    processingFee: 0,
    cashbackPercent: 0,
    recommendationReason: "Lowest 0% monthly payment over a 1-year horizon",
  },
  {
    tenureMonths: 24,
    annualInterestRate: 11.99, // 11.99% p.a. partner lending rate for extended tenure
    processingFee: 499,
  },
];

/**
 * Generates computed EMI plans for a specific principal amount.
 * Applies transparent recommendation rule:
 * Recommendation Rule: Selects the 6-month 0% plan as Recommended because it maximizes monthly
 * affordability without any interest or fees, while maintaining short mutual fund pledge duration.
 */
export function generateEmiPlans(
  principal: number,
  configs: EmiPlanConfig[] = DEFAULT_PLAN_CONFIGS
): EmiPlan[] {
  return configs.map((config) => {
    let cashback = config.cashbackFixed || 0;
    if (config.cashbackPercent && principal > 0) {
      cashback += Math.round((principal * config.cashbackPercent) / 100);
    }

    const calculation = calculateEmi({
      principal,
      tenureMonths: config.tenureMonths,
      annualInterestRate: config.annualInterestRate,
      cashback,
      processingFee: config.processingFee,
    });

    // Explainable recommendation: 6-month plan provides the best balance of 0% interest and manageable monthly outflow
    const isRecommended = config.tenureMonths === 6 && config.annualInterestRate === 0;

    return {
      ...calculation,
      id: `plan-${config.tenureMonths}m-${config.annualInterestRate === 0 ? "0cost" : "std"}`,
      isRecommended,
      recommendationTag: isRecommended ? "Recommended" : undefined,
      recommendationReason: isRecommended ? config.recommendationReason : undefined,
    };
  });
}

/**
 * Helper to get the lowest monthly starting EMI for product catalog preview
 */
export function getStartingEmi(principal: number): {
  monthlyEmi: number;
  tenureMonths: number;
  isZeroCost: boolean;
} {
  const plans = generateEmiPlans(principal);
  // Find the zero-cost plan with the lowest monthly installment (longest zero-cost tenure)
  const zeroCostPlans = plans.filter((p) => p.isZeroCost);
  if (zeroCostPlans.length > 0) {
    const bestZeroPlan = zeroCostPlans.reduce((min, curr) =>
      curr.monthlyEmi < min.monthlyEmi ? curr : min
    );
    return {
      monthlyEmi: bestZeroPlan.monthlyEmi,
      tenureMonths: bestZeroPlan.tenureMonths,
      isZeroCost: true,
    };
  }

  // Fallback to lowest overall
  const minPlan = plans.reduce((min, curr) =>
    curr.monthlyEmi < min.monthlyEmi ? curr : min
  );
  return {
    monthlyEmi: minPlan.monthlyEmi,
    tenureMonths: minPlan.tenureMonths,
    isZeroCost: minPlan.isZeroCost,
  };
}
