import { describe, it, expect } from "vitest";
import { calculateEmi, formatINR } from "../src/modules/emi/calculator";
import { generateEmiPlans, getStartingEmi } from "../src/modules/emi/plans";

describe("EMI Calculation Engine", () => {
  describe("0% No-Cost EMI Formula: P / n", () => {
    it("correctly calculates 0% EMI for standard tenure without remainder", () => {
      const result = calculateEmi({
        principal: 60000,
        tenureMonths: 6,
        annualInterestRate: 0,
      });

      expect(result.monthlyEmi).toBe(10000);
      expect(result.totalInterest).toBe(0);
      expect(result.totalPayable).toBe(60000);
      expect(result.isZeroCost).toBe(true);
    });

    it("correctly rounds 0% EMI when principal is not evenly divisible", () => {
      // 79,999 / 6 = 13333.166... -> rounds to 13333
      const result = calculateEmi({
        principal: 79999,
        tenureMonths: 6,
        annualInterestRate: 0,
      });

      expect(result.monthlyEmi).toBe(13333);
      expect(result.isZeroCost).toBe(true);
      expect(result.totalInterest).toBe(0);
    });

    it("correctly calculates 12-month 0% EMI", () => {
      // 120,000 / 12 = 10,000
      const result = calculateEmi({
        principal: 120000,
        tenureMonths: 12,
        annualInterestRate: 0,
      });

      expect(result.monthlyEmi).toBe(10000);
      expect(result.totalInterest).toBe(0);
      expect(result.totalPayable).toBe(120000);
    });

    it("includes processing fee in total payable when configured", () => {
      const result = calculateEmi({
        principal: 60000,
        tenureMonths: 6,
        annualInterestRate: 0,
        processingFee: 499,
      });

      expect(result.monthlyEmi).toBe(10000);
      expect(result.processingFee).toBe(499);
      expect(result.totalPayable).toBe(60499);
    });

    it("correctly deducts cashback from effective total", () => {
      const result = calculateEmi({
        principal: 50000,
        tenureMonths: 6,
        annualInterestRate: 0,
        cashback: 1500,
      });

      expect(result.monthlyEmi).toBe(8333);
      expect(result.totalPayable).toBe(50000); // monthlyEmi * 6 = 49998 or 50000
      expect(result.effectiveTotalAfterCashback).toBe(48500);
    });
  });

  describe("Non-Zero Interest Reducing Balance Formula: P * r * (1+r)^n / ((1+r)^n - 1)", () => {
    it("correctly calculates 24-month EMI with 12% p.a. interest", () => {
      // P = 100,000, r = 12 / 12 / 100 = 0.01, n = 24
      // EMI = 100000 * 0.01 * (1.01)^24 / ((1.01)^24 - 1)
      // (1.01)^24 = 1.2697346
      // EMI = 1000 * 1.2697346 / 0.2697346 = 4707.347 -> rounds to 4707
      const result = calculateEmi({
        principal: 100000,
        tenureMonths: 24,
        annualInterestRate: 12,
      });

      expect(result.monthlyEmi).toBe(4707);
      expect(result.isZeroCost).toBe(false);
      // Total paid = 4707 * 24 = 112,968
      // Interest = 112,968 - 100,000 = 12,968
      expect(result.totalInterest).toBe(12968);
      expect(result.totalPayable).toBe(112968);
    });

    it("handles 0 principal safely without throwing NaN or division by zero", () => {
      const result = calculateEmi({
        principal: 0,
        tenureMonths: 12,
        annualInterestRate: 10,
      });

      expect(result.monthlyEmi).toBe(0);
      expect(result.totalInterest).toBe(0);
      expect(result.totalPayable).toBe(0);
    });

    it("throws an informative error if tenure is non-positive", () => {
      expect(() =>
        calculateEmi({
          principal: 50000,
          tenureMonths: 0,
          annualInterestRate: 0,
        })
      ).toThrow("Tenure in months must be greater than 0");
    });
  });

  describe("generateEmiPlans and Recommendation Logic", () => {
    it("generates plans for 3, 6, 12, and 24 months", () => {
      const plans = generateEmiPlans(79900);

      expect(plans.length).toBe(4);
      const tenures = plans.map((p) => p.tenureMonths);
      expect(tenures).toEqual([3, 6, 12, 24]);
    });

    it("applies the transparent recommendation rule to the 6-month 0% plan", () => {
      const plans = generateEmiPlans(89900);
      const recommendedPlan = plans.find((p) => p.isRecommended);

      expect(recommendedPlan).toBeDefined();
      expect(recommendedPlan?.tenureMonths).toBe(6);
      expect(recommendedPlan?.isZeroCost).toBe(true);
      expect(recommendedPlan?.recommendationReason).toContain("0% Interest");
    });

    it("returns correct starting EMI helper for product cards", () => {
      const starting = getStartingEmi(120000);

      // Starting should be the lowest 0% monthly payment (12 months = 10,000/mo)
      expect(starting.tenureMonths).toBe(12);
      expect(starting.monthlyEmi).toBe(10000);
      expect(starting.isZeroCost).toBe(true);
    });
  });

  describe("Currency Formatting", () => {
    it("formats Indian Rupee numbers with standard en-IN separators", () => {
      expect(formatINR(100000)).toBe("₹1,00,000");
      expect(formatINR(74999)).toBe("₹74,999");
      expect(formatINR(129900)).toBe("₹1,29,900");
    });

    it("can format without currency symbol", () => {
      expect(formatINR(50000, false)).toBe("50,000");
    });
  });
});
