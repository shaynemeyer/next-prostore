'use client';

import React from 'react';
import { productDefaultValues } from '@/lib/constants';
import { insertProductSchema, updateProductSchema } from '@/lib/validators';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import slugify from 'slugify';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';

function ProductForm({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update';
  product?: Product;
  productId?: string;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver:
      type === 'Update'
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductSchema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values
  ) => {
    // On Create
    if (type === 'Create') {
      const res = await createProduct(values);

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        router.push('/admin/products');
      }
    }

    // On Update
    if (type === 'Update') {
      if (!productId) {
        router.push('/admin/products');
        return;
      }

      const res = await updateProduct({ ...values, id: productId });

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        router.push('/admin/products');
      }
    }
  };

  const images = form.watch('images');
  const isFeatured = form.watch('isFeatured');
  const banner = form.watch('banner');

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row gap-5">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'name'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'slug'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter slug" {...field} />
                    <Button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                      onClick={() => {
                        form.setValue(
                          'slug',
                          slugify(form.getValues('name'), { lower: true })
                        );
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Category */}
          {/* Brand */}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Price */}
          {/* Stock */}
        </div>
        <div className="upload-field flex flex-col md:flex-row gap-5">
          {/* Images */}
        </div>
        <div className="upload-field">{/* isFeatured */}</div>
        <div>{/* Description */}</div>
        <div>{/* Submit */}</div>
      </form>
    </Form>
  );
}

export default ProductForm;
