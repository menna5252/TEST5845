"use client";
import { Product } from "@/interfaces/products";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "../cart/AddToCartBtn";
import WishListActions from "../wishlist/WishListActions";
import { useSession } from "next-auth/react";

export default  function ProductItem({
  product,
  isWishlist,
}: {
  product: Product;
  isWishlist?: boolean;
}) {
  const {status}=useSession()
  return (
    <div>
      <div className="relative group">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            width={270}
            height={250}
            className="w-full h-[15.625rem] object-contain bg-gray-100"
            loading="lazy"
          />
        </Link>
        {status === "authenticated" && (
          <>
            <WishListActions product={product} isWishlist={isWishlist} />
            <AddToCartBtn
              className="cursor-pointer absolute w-full bottom-0 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100"
              productId={product._id}
            />
          </>
        )}
      </div>
      <Link href={`/products/${product._id}`}>
        <h1 className="text-center mt-2 font-medium line-clamp-1">
          {product.title}
        </h1>
      </Link>
      <div className="flex gap-4 mt-2">
        <span className="text-lg font-medium text-red-500 ">
          ${product.price}
        </span>
        <div className="flex gap-1 items-center">
          <Star className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-gray-500">
            ({product.ratingsAverage})
          </span>
        </div>
      </div>
    </div>
  );
}
