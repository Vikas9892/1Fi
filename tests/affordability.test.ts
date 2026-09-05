import { describe, it, expect } from "vitest";
import {
  evaluateAffordability,
  DEFAULT_MOCK_LIMIT,
  PRESET_MOCK_LIMITS,
} from "../src/modules/affordability/limit";

describe("Affordability & Limit Evaluation Engine", () => {
  it("approves purchase when price is well below available limit", () => {
    // Limit: ₹1,00,000, Purchase: ₹74,900
    const evaluation = evaluateAffordability(74900, 100000);

    expect(evaluation.isEligible).toBe(true);
    expect(evaluation.remainingLimit).toBe(25100);
    expect(evaluation.shortfall).toBe(0);
    expect(evaluation.utilizationPercentage).toBe(75);
    expect(evaluation.statusMessage).toContain("You can proceed");
    expect(evaluation.statusMessage).toContain("₹25,100");
  });

  it("approves purchase when price is exactly equal to available limit", () => {
    // Limit: ₹1,00,000, Purchase: ₹1,00,000
    const evaluation = evaluateAffordability(100000, 100000);

    expect(evaluation.isEligible).toBe(true);
    expect(evaluation.remainingLimit).toBe(0);
    expect(evaluation.shortfall).toBe(0);
    expect(evaluation.utilizationPercentage).toBe(100);
    expect(evaluation.statusMessage).toContain("Remaining limit: ₹0");
  });

  it("rejects purchase and accurately computes shortfall when price exceeds limit", () => {
    // Limit: ₹50,000, Purchase: ₹79,999 -> Shortfall = ₹29,999
    const evaluation = evaluateAffordability(79999, 50000);

    expect(evaluation.isEligible).toBe(false);
    expect(evaluation.remainingLimit).toBe(0);
    expect(evaluation.shortfall).toBe(29999);
    expect(evaluation.statusMessage).toContain("₹29,999 more limit required");
  });

  it("uses default mock limit of ₹1,00,000 if not explicitly supplied", () => {
    const evaluation = evaluateAffordability(60000);

    expect(evaluation.availableLimit).toBe(DEFAULT_MOCK_LIMIT);
    expect(evaluation.availableLimit).toBe(100000);
    expect(evaluation.isEligible).toBe(true);
    expect(evaluation.remainingLimit).toBe(40000);
  });

  it("handles 0 or negative purchase safely", () => {
    const evaluation = evaluateAffordability(0, 50000);

    expect(evaluation.isEligible).toBe(true);
    expect(evaluation.remainingLimit).toBe(50000);
    expect(evaluation.shortfall).toBe(0);
    expect(evaluation.utilizationPercentage).toBe(0);
  });

  it("includes expected test preset limits for evaluator testing", () => {
    const values = PRESET_MOCK_LIMITS.map((p) => p.value);
    expect(values).toContain(50000);
    expect(values).toContain(100000);
  });
});
