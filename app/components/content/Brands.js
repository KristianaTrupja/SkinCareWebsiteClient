"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

export default function Brands() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("http://localhost:5000/brands");
        setContent(response.data.content);
      } catch (err) {
        console.log("Error fetching brands", err);
      }
    };
    fetchContent();
  }, []);

  // Swipe handlers for mobile
  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex((prev) => (prev + 1) % content.length),
    onSwipedRight: () =>
      setActiveIndex((prev) => (prev - 1 + content.length) % content.length),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden my-16 p-10">
      {/* Content Section */}
      <div {...handlers} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <img
          src={content[activeIndex]?.image}
          alt={content[activeIndex]?.title}
          className="w-full h-[200px] md:h-[500px] object-cover rounded-xl shadow-lg"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {content[activeIndex]?.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {content[activeIndex]?.description}
          </p>
          <button className="mt-8 bg-peach text-white text-lg px-8 py-3 rounded-xl shadow-lg transition hover:bg-rosy w-max">
            Learn More
          </button>
        </div>
      </div>

      {/* Navigation Dots (Mobile Only) */}
      <div className="flex md:hidden justify-center gap-2 mt-6">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              activeIndex === index ? "bg-rosy w-4 h-4" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons (Only for Desktop) */}
      <div className="mt-10 hidden md:flex justify-center gap-6 border-t pt-6">
        {content.map((item, index) => (
          <button
            key={item.id || `brand-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`text-lg text-white font-medium px-8 py-3 rounded-xl shadow-md transition ${
              activeIndex === index ? "bg-rosy" : "bg-peach"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}
