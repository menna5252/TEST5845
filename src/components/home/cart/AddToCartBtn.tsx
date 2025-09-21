"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { AddProductToCart } from "@/services/cartApi";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import QuantityUpdate from "./QuantityUpdate";

export default function AddToCartBtn({
  productId,
  ...props
}: {
  productId: string;
  [key: string]: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [itemQuantity, setItemQuantity] = useState(0);
  const { fetchCart, cartItems } = useCart();

  useEffect(() => {
    startTransition(() => {
    if (cartItems) {
      cartItems?.data?.products.map((item) => {
        if (item.product._id === productId) {
          setItemQuantity(item.count);
        }
      });
    }
    });
  }, [cartItems, productId]);

  async function handleAddProductToCart(productId: string) {
    startTransition(async () => {
      const data = await AddProductToCart(productId);
      if (data?.status === "success") {
        toast.success("Product added to cart", { position: "top-center" });
        setItemQuantity((prev) => prev + 1);
        await fetchCart();
      } else {
        toast.error("Failed to add product to cart", {
          position: "top-center",
        });
      }
    });
  }

 

  return (
    <>
      {itemQuantity > 0 ? (
        <div className=" w-full mt-2 flex items-center gap-2 justify-center ">
          <QuantityUpdate
            productId={productId}
            itemQuantity={itemQuantity}
            setItemQuantity={setItemQuantity}
          />
        </div>
      ) : (
        <Button
          disabled={isPending}
          {...props}
          onClick={() => handleAddProductToCart(productId)}
        >
          {isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Add to Cart"
          )}
        </Button>
      )}
    </>
  );
}
