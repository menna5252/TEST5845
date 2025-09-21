"use client";
import { useWishList } from "@/contexts/WishListContext";
import Loading from "./loading";
import ProductItem from "@/components/home/Products/ProductItem";

export default function Wishlist() {
  const { wishlistItems } = useWishList();
  

  console.log("gg", wishlistItems);

 
  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        {wishlistItems ? (
          wishlistItems?.count === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">
                Your WishList is Empty
              </h2>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-semibold mb-6">
                Your Wishlist has ({wishlistItems?.count}) products
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlistItems?.data?.map((product) => (
                  <ProductItem key={product._id} product={product} isWishlist  />
                ))}
              </div>
            </>
          )
        ) : (
          <div className="text-center">
            <Loading />
          </div>
        )}
      </div>
    </section>
  );
}
