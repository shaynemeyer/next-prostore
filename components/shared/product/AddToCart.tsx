"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";

function AddToCart({ item }: { item: CartItem }) {
  const router = useRouter();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast(() => <>{`${item.name} added to cart`}</>, {
      description: () => (
        <Button
          onClick={() => router.push("/cart")}
          className="bg-primary text-white hover:bg-gray-800"
        >
          Go To Cart
        </Button>
      ),
    });
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  );
}
export default AddToCart;
