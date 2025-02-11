"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Stage = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stage-content/get-stage');
        setSlides(response.data.content);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-r from-peach to-rose">
      <Swiper
        centeredSlides={true}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="relative w-full h-72 sm:h-80 md:h-[700px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-xl transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
              {/* Text Container */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-rosy via-lightRose to-transparent p-6">
                {/* Badge-style Background */}
                <div className="bg-gradient-to-r from-softGold via-rose to-peach text-white p-4 rounded-tl-lg rounded-br-lg max-w-[90%] mx-auto relative shadow-lg transform hover:scale-105 transition-all duration-300">
                  {/* Title */}
                  <h2 className="text-xl md:text-4xl font-bold text-left transform hover:scale-105 transition-all duration-300">
                    {slide.title}
                  </h2>
                  {/* Description */}
                  <p className="text-sm md:text-lg mt-2 text-left opacity-90 transform hover:scale-105 transition-all duration-300">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Stage;
