"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex gap-4">
      <Swiper
        direction="vertical"
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-[6rem] h-[37.5rem] mySwiper"
      >
        {images &&
          images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`thumb_${index}`}
                width={170}
                height={138}
                className="w-full h-[9rem] object-cover cursor-pointer"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Main image slider */}
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-[30rem] h-[37.5rem]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`img_${index}`}
              width={500}
              height={600}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
