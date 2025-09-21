import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import { Product } from "@/interfaces/products";
import { getAllProducts } from "@/services/productsApi";
import Link from "next/link";
import ProductItem from "./ProductItem";

export default async function ProductsSection() {
  const { data: products }: { data: Product[] } = await getAllProducts({ limit: 8 });
  console.log(products);

  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <SectionTitle title="Our Products" subtitle="Explore our products" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>
        <div className="flex justify-center mt-5">
          <Button variant="destructive" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
