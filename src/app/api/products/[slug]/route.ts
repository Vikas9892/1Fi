import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/modules/catalog/repository";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const product = getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: `Product not found with slug: "${slug}"`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve product details",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
