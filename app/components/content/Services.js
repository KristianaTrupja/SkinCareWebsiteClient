"use client";
import { FaLeaf, FaShippingFast, FaHeart, FaUserCheck } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";

const services = [
  { id: 0, icon: <FaLeaf className="text-primary text-5xl" /> },
  { id: 1, icon: <FaUserCheck className="text-primary text-5xl" /> },
  { id: 2, icon: <FaShippingFast className="text-primary text-5xl" /> },
  { id: 3, icon: <FaHeart className="text-primary text-5xl" /> },
];

export default function Services() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services/get-services");
        setData(response.data.content);
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto py-20 px-6 md:px-12 bg-gradient-to-r from-amber-400 via-orange-300 to-rose-200 rounded-lg overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide">
        🌟 Pse të na zgjidhni ne?
        </h2>
         <p className="text-lg text-white mt-3 max-w-2xl mx-auto">
         ✨ Bukuri Koreane, Cilësi e Garantuar – Sepse Ju Meritoni Më të Mirën! ✨
        </p> 
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((service, index) => (
          <div
            key={index}
            className="relative p-8 rounded-3xl bg-white shadow-2xl text-center transition-all transform hover:scale-105 hover:shadow-2xl border-2 border-transparent backdrop-blur-md"
          >
            {/* Icon */}
            <div className="flex justify-center items-center mb-6 text-rose-500">
              {services.find((icon) => icon.id === index)?.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>

            {/* Description */}
            <p className="text-gray-700 mt-3">{service.description}</p>

          </div>
        ))}
      </div>
    </section>
  );
}
