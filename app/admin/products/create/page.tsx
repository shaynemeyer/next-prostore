import React from 'react';
import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth-guard';
import ProductForm from '@/components/shared/product/ProductForm';

export const metadata: Metadata = {
  title: 'Create Product',
};

async function CreateProductPage() {
  await requireAdmin();

  return (
    <>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        <ProductForm type="Create" />
      </div>
    </>
  );
}

export default CreateProductPage;
