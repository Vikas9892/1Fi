import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/modules/catalog/repository";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand") || undefined;
    const search = searchParams.get("search") || undefined;

    const products = getAllProducts({ brand, search });

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve products catalog",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
