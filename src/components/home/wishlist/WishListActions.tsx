"use client";
import { Heart, LoaderCircle, Trash } from "lucide-react";
import {
  AddProductToWishList,
  removeItemFromWishList,
} from "@/services/wishlistApi";
import { useWishList } from "@/contexts/WishListContext";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Product } from "@/interfaces/products";

export default function WishListActions({
  product,
  isWishlist,
}: {
  product: Product;
  isWishlist?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const { fetchWishList, wishlistItems } = useWishList();
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  useEffect(() => {
    startTransition(() => {
      wishlistItems?.data?.map((item) => {
        if (item._id === product._id) {
          setIsAddedToWishlist(true);
        }
      });
    });
  }, [wishlistItems, isWishlist, product._id]);

  async function handelDeleteItem(productId: string) {
    startTransition(async () => {
      const res = await removeItemFromWishList(productId);
      if (res?.status === "success") {
        toast.success("Item removed from your wishlist", {
          position: "top-center",
        });
        await fetchWishList();
        setIsAddedToWishlist(false);
      } else {
        toast.error("Failed to remove item from your wishlist", {
          position: "top-center",
        });
      }
    });
  }

  async function handleAddProductToWishList(productId: string) {
    startTransition(async () => {
      const data = await AddProductToWishList(productId);
      if (data?.status === "success") {
        toast.success("Product added to wishlist", { position: "top-center" });
        await fetchWishList();
        setIsAddedToWishlist(true);
      } else {
        toast.error("Failed to add product to cart", {
          position: "top-center",
        });
      }
    });
  }

  return (
    <>
      {isWishlist ? (
        isPending ? (
          <div className="absolute top-2 right-2">
            <LoaderCircle className="animate-spin text-red-500" />
          </div>
        ) : (
          <Trash
            onClick={() => handelDeleteItem(product._id)}
            className="absolute top-2 right-2 cursor-pointer text-red-500"
          />
        )
      ) : isAddedToWishlist ? (
        isPending ? (
          <div className="absolute top-2 right-2">
            <LoaderCircle className="animate-spin text-red-500" />
          </div>
        ) : (
          <Heart
            onClick={() => handelDeleteItem(product._id)}
            className="cursor-pointer absolute top-2 right-2 text-red-500 fill-red-500"
          />
        )
      ) : isPending ? (
        <div className="absolute top-2 right-2">
          <LoaderCircle className="animate-spin text-gray-400" />
        </div>
      ) : (
        <Heart
          onClick={() => handleAddProductToWishList(product._id)}
          className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-red-500"
        />
      )}
    </>
  );
}
