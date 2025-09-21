import Item from "@/components/shared/CategoryBrandItem";
import { Category } from "@/interfaces/categories";
import { getAllCategories } from "@/services/categoriesApi";
import React from "react";

export default async function Categories() {
  const { data: categories }: { data: Category[] } = await getAllCategories();

  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-semibold mb-6 text-center">
          All categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories &&
            categories.map((category) => (
              <Item key={category._id} item={category} />
            ))}
        </div>
      </div>
    </section>
  );
}
