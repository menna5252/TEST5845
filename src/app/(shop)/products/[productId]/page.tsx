import AddToCartBtn from "@/components/home/cart/AddToCartBtn";
import ProductItem from "@/components/home/Products/ProductItem";
import ProductSlider from "@/components/home/Products/ProductSlider";
import WishListActions from "@/components/home/wishlist/WishListActions";
import SectionTitle from "@/components/shared/SectionTitle";
import { Product } from "@/interfaces/products";
import { getAllProducts, getProductDetails } from "@/services/productsApi";
import { Star } from "lucide-react";

export default async function ProductDetails({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const { data: productDetails }: { data: Product } = await getProductDetails(
    productId
  );
  const { data: relatedProducts }: { data: Product[] } = await getAllProducts({
    limit: 4,
    category: productDetails?.category?._id,
  });
  console.log("related products", relatedProducts);

  console.log(productDetails);

  return (
    <section className="py-16">
      <div className="container mx-auto px-16">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            {/* <Image
              src={productDetails?.imageCover}
              alt={productDetails?.title}
              width={500}
              height={600}
              className="w-full h-[37.50rem] object-cover"
              loading="lazy"
            /> */}
            <ProductSlider images={productDetails?.images} />
          </div>
          <div className="lg:col-span-1 relative">
            <h1 className="font-semibold mb-4">{productDetails?.title}</h1>
            <div className="flex gap-1 items-center mb-4">
              <Star className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-gray-500">
                ({productDetails?.ratingsAverage})
              </span>
            </div>
            <span className="text-lg">${productDetails?.price}</span>
            <p className="mt-4 border-b-1 pb-3 border-gray-300">
              {productDetails?.description}
            </p>
            <WishListActions product={productDetails} />
            <AddToCartBtn
              className="cursor-pointer mt-4 w-full"
              variant={"destructive"}
              productId={productId}
            />
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <>
            <SectionTitle
              title="Related Products"
              subtitle="You may also like"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {relatedProducts?.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
