import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/modules/catalog/repository";
import { ProductDetailView } from "@/components/pdp/ProductDetailView";
import { formatINR } from "@/modules/emi/calculator";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | 1Fi Marketplace",
    };
  }

  const basePrice = product.variants[0]?.sellingPrice || 0;
  return {
    title: `${product.name} with 0% No-Cost EMI | 1Fi Marketplace`,
    description: `Buy ${product.name} on 1Fi starting at ${formatINR(
      basePrice
    )}. Pledge your mutual funds for 0% interest EMI without liquidating your investments.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView slug={slug} initialProduct={product} />;
}
