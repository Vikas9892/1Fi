import { NextRequest, NextResponse } from "next/server";
import { generateEmiPlans } from "@/modules/emi/plans";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const amountStr = searchParams.get("amount");

    if (!amountStr) {
      return NextResponse.json(
        { success: false, error: "Missing required 'amount' query parameter" },
        { status: 400 }
      );
    }

    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount < 0) {
      return NextResponse.json(
        { success: false, error: "Amount must be a non-negative number" },
        { status: 400 }
      );
    }

    const plans = generateEmiPlans(amount);

    return NextResponse.json({
      success: true,
      principal: amount,
      plans,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate EMI plans",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
