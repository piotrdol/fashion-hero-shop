"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

interface ProductViewTrackerProps {
  productId: string;
  productName: string;
  productSlug: string;
  productPrice: number;
  productCategory: string;
}

export function ProductViewTracker({
  productId,
  productName,
  productSlug,
  productPrice,
  productCategory,
}: ProductViewTrackerProps) {
  useEffect(() => {
    posthog.capture("product_viewed", {
      product_id: productId,
      product_name: productName,
      product_slug: productSlug,
      product_price: productPrice,
      product_category: productCategory,
    });
  }, [productId, productName, productSlug, productPrice, productCategory]);

  return null;
}
