import ProductItem from "@/components/home/Products/ProductItem";
import SectionTitle from "@/components/shared/SectionTitle";
import { Product } from "@/interfaces/products";
import { getSpecificCategory } from "@/services/categoriesApi";
import { getAllProducts } from "@/services/productsApi";

export default async function ShopByCategoryLayout({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  console.log("categoryId", categoryId);
  const { data: category } = await getSpecificCategory(categoryId);
  const { data: products }: { data: Product[] } = await getAllProducts({
    category: categoryId,
  });
  console.log(products);

  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <SectionTitle
          title="Products"
          subtitle={`Shop by ${category?.name} category`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          ) : (
            <h1 className="text-center col-span-4">
              No products found in this {category?.name} category
            </h1>
          )}
        </div>
      </div>
    </section>
  );
}
