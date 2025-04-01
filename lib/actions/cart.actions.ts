"use server";

import { CartItem } from "@/types";

export async function addItemToCart(data: CartItem) {
  console.log(`${JSON.stringify(data)} added to cart`);

  return {
    success: true,
    message: "Item added to cart",
  };
}
