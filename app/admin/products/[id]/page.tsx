import { requireAdmin } from '@/lib/auth-guard';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Update Product',
};

async function ProductDetailsPage(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  await requireAdmin();

  const { id } = await props.params;

  return <div>ProductDetailsPage: {id}</div>;
}

export default ProductDetailsPage;
