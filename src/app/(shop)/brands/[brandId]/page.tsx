import ProductItem from "@/components/home/Products/ProductItem";
import SectionTitle from "@/components/shared/SectionTitle";
import { Product } from "@/interfaces/products";
import { getSpecificBrand } from "@/services/brandsApi";
import { getAllProducts } from "@/services/productsApi";

export default async function ShopByBrandLayout({
  params: { brandId },
}: {
  params: { brandId: string };
}) {
  const { data: brand } = await getSpecificBrand(brandId);
  const { data: products }: { data: Product[] } = await getAllProducts({
    brand: brandId,
  });
  console.log(products);

  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <SectionTitle
          title="Products"
          subtitle={`Shop by ${brand?.name} brand`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          ) : (
            <h1 className="text-center col-span-4">
              No products found in this {brand?.name} brand
            </h1>
          )}
        </div>
      </div>
    </section>
  );
}
