import { EmiCalculationInput, EmiCalculationResult } from "./types";

/**
 * Pure financial calculation module for 1Fi Equated Monthly Installments (EMI).
 * 
 * Formulas:
 * 1. Zero-Cost / 0% Interest:
 *    EMI = Principal / Tenure
 * 
 * 2. Standard Reducing Balance Interest:
 *    r = annualRate / 12 / 100
 *    EMI = P * r * (1+r)^n / ((1+r)^n - 1)
 *    where:
 *      P = principal amount
 *      r = monthly interest rate in decimal
 *      n = tenure in months
 */
export function calculateEmi(input: EmiCalculationInput): EmiCalculationResult {
  const {
    principal,
    tenureMonths,
    annualInterestRate,
    cashback = 0,
    processingFee = 0,
  } = input;

  if (principal <= 0) {
    return {
      principal: 0,
      tenureMonths,
      annualInterestRate,
      isZeroCost: annualInterestRate === 0,
      monthlyEmi: 0,
      totalInterest: 0,
      totalPayable: processingFee,
      effectiveTotalAfterCashback: Math.max(0, processingFee - cashback),
      cashback,
      processingFee,
    };
  }

  if (tenureMonths <= 0) {
    throw new Error("Tenure in months must be greater than 0");
  }

  let monthlyEmi: number;
  let totalInterest: number;

  if (annualInterestRate <= 0) {
    // 0% No-cost EMI
    monthlyEmi = Math.round(principal / tenureMonths);
    totalInterest = 0;
  } else {
    // Non-zero interest rate reducing balance amortization
    const monthlyRate = annualInterestRate / 12 / 100;
    const compoundFactor = Math.pow(1 + monthlyRate, tenureMonths);
    const unroundedEmi =
      (principal * monthlyRate * compoundFactor) / (compoundFactor - 1);
    
    monthlyEmi = Math.round(unroundedEmi);
    totalInterest = Math.max(0, monthlyEmi * tenureMonths - principal);
  }

  const totalPayable = monthlyEmi * tenureMonths + processingFee;
  const effectiveTotalAfterCashback = Math.max(0, totalPayable - cashback);

  return {
    principal,
    tenureMonths,
    annualInterestRate,
    isZeroCost: annualInterestRate === 0,
    monthlyEmi,
    totalInterest,
    totalPayable,
    effectiveTotalAfterCashback,
    cashback,
    processingFee,
  };
}

/**
 * Formats a number to standard Indian Rupee notation (e.g. ₹1,29,900)
 */
export function formatINR(amount: number, includeSymbol = true): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat("en-IN").format(rounded);
  return includeSymbol ? `₹${formatted}` : formatted;
}
