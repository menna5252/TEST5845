"use client";
import { Category } from "@/interfaces/categories";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
const swiperOptions = {
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1600: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  },
  modules: [Pagination],
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet border-2 !size-3",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-red-400 border-white",
  },
};
const CategoriesSlider = ({ categories }: { categories: Category[] }) => {
  const router=useRouter();
  return (
    <Swiper className="categories-slider" {...swiperOptions}>
      {categories &&
        categories.map((category) => (
          <SwiperSlide key={category._id} className="mb-8">
            <Image
              src={category.image}
              alt={category.name}
              width={270}
              height={250}
              className="w-full h-[15.625rem] object-contain bg-gray-100 cursor-pointer"
              loading="lazy"
              onClick={()=>router.push(`/categories/${category._id}`)}
            />
            <h1 className="text-center mt-2 font-medium">{category.name}</h1>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default CategoriesSlider;
