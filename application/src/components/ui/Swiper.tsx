'use client';

// Libraries
import React from 'react';
import {
  Swiper as SwiperComponent,
  SwiperProps as SwiperPropsType,
  SwiperSlide,
  SwiperSlideProps,
} from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Styles
import 'swiper/css/pagination';

interface SwiperProps extends SwiperPropsType {}

export const Swiper: React.FC<SwiperProps> = ({ children, ...restOfProps }) => {
  return (
    <SwiperComponent
      spaceBetween={0}
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      speed={1000}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      {...restOfProps}
    >
      {children}
    </SwiperComponent>
  );
};

export { SwiperSlide, type SwiperSlideProps };
