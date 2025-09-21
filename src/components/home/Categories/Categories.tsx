import { Category } from "@/interfaces/categories";
import { getAllCategories } from "@/services/categoriesApi";
import React from "react";
import CategoriesSlider from "./CategoriesSlider";
import SectionTitle from "@/components/shared/SectionTitle";

export default async function Categories() {
  const {data:categories} :{data:Category[]}= await getAllCategories();
  console.log(categories);

  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <SectionTitle title="Categories" subtitle="Shop by category" />
        <CategoriesSlider categories={categories} />
      </div>
    </section>
  );
}
