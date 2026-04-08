import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import ProductCard from "./ProductCard"; // Replace with your actual path

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function BikeCarousel({ products = [] }) {
  const { dark } = useTheme();

  return (
    <section className="bike-showcase" style={{ background: dark ? "#000" : "#fff", padding: "100px 0" }}>
      <style>{`
        .showcase-header {
          max-width: 1400px; margin: 0 auto 50px; padding: 0 30px;
          display: flex; justify-content: space-between; align-items: flex-end;
        }
        .showcase-header h2 { 
          font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; 
          color: ${dark ? "#fff" : "#000"}; margin: 0; line-height: 0.9;
        }
        .showcase-header span { 
          color: #FF5A1F; font-weight: 800; font-size: 0.75rem; 
          text-transform: uppercase; letter-spacing: 0.4em; display: block; margin-bottom: 12px;
        }
        .view-all {
          color: ${dark ? "#fff" : "#000"}; text-decoration: none; font-weight: 700;
          font-size: 0.85rem; border-bottom: 2px solid #FF5A1F; padding-bottom: 5px;
        }
        .bike-swiper { padding: 0 0 100px !important; cursor: grab; }
        .bike-swiper:active { cursor: grabbing; }
        
        /* Custom Pagination */
        .swiper-pagination-bullet-active { background: #FF5A1F !important; width: 30px !important; border-radius: 4px !important; }
      `}</style>

      <div className="showcase-header">
        <div>
          <span>The Machines</span>
          <h2>DIRT LINEUP</h2>
        </div>
        <Link to={"/products"} className="view-all">VIEW ALL BIKES →</Link>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        spaceBetween={50}
        slidesPerView={1.2}
        centeredSlides={true}
        mousewheel={{ forceToAxis: true }}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: { slidesPerView: 2.4, spaceBetween: 70 }
        }}
        className="bike-swiper"
      >
        {products.map(bike => (
          <SwiperSlide key={bike.id}>
            <ProductCard product={bike} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}