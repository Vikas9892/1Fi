import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/modules/catalog/repository";
import { PlanReviewView } from "@/components/review/PlanReviewView";

interface PlanReviewPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PlanReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Plan Review | 1Fi Marketplace",
    };
  }

  return {
    title: `Review EMI Plan for ${product.name} | 1Fi Marketplace`,
    description: `Review your 0% mutual fund backed EMI plan for ${product.name}. Check your available limit and proceed to digital pledge.`,
  };
}

export default async function PlanReviewPage({ params }: PlanReviewPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <PlanReviewView slug={slug} initialProduct={product} />;
}
