import Categories from "@/components/home/Categories/Categories";
import MainSlider from "@/components/home/MainSlider";
import ProductsSection from "@/components/home/Products/ProductsSection";
import SharedLoader from "@/components/shared/SharedLoader";
import { Suspense } from "react";

export default  function Home() {
  
  
  return (
    <>
      <MainSlider />
      <Suspense fallback={<SharedLoader />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<SharedLoader />}>
        <ProductsSection />
      </Suspense>
    </>
  );
}
