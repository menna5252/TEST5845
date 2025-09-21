import Item from "@/components/shared/CategoryBrandItem";
import { Brand } from "@/interfaces/brand";
import { getAllBrands } from "@/services/brandsApi";
import React from "react";

export default async function Brands() {
  const { data: brands }: { data: Brand[] } = await getAllBrands();

  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-semibold mb-6 text-center">All brands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {brands &&
            brands.map((brand) => <Item isBrand key={brand._id} item={brand} />)}
        </div>
      </div>
    </section>
  );
}
