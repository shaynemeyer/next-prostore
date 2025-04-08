import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";
import React from "react";
import { getProductById } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = {
  title: "Update Product",
};

async function ProductDetailsPage(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  await requireAdmin();

  const { id } = await props.params;

  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Product</h1>

      <ProductForm type="Update" product={product} productId={product.id} />
    </div>
  );
}

export default ProductDetailsPage;
