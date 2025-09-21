import ProductItem from "@/components/home/Products/ProductItem";
import { Product } from "@/interfaces/products";
import { getAllProducts } from "@/services/productsApi";

export default async function Products() {
  const { data: products }: { data: Product[] } = await getAllProducts();
  console.log(products);

  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-semibold mb-6 text-center">
          All products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}
