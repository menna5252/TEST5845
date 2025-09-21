"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "@/assets/images/slider-image-1.jpeg";
import slide2 from "@/assets/images/slider-image-2.jpeg";
import slide3 from "@/assets/images/slider-image-3.jpeg";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";

const slides = [
  {
    path: slide1,
    title: "Slide 1",
  },
  {
    path: slide2,
    title: "Slide 2",
  },
  {
    path: slide3,
    title: "Slide 3",
  },
];
const swiperOptions = {
  modules: [Pagination,Autoplay],
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet border-2 !size-3",
    bulletActiveClass:"swiper-pagination-bullet-active !bg-red-400 border-white"
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

};
const MainSlider = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <Swiper {...swiperOptions}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Image
                src={slide.path}
                alt={slide.title}
                width={1000}
                height={344}
                className="w-full h-[21.5rem] object-cover"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MainSlider;
