"use client";
import axios from "axios";
import { useState, useEffect } from "react";


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
console.log(content)
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden my-16 p-10">
      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <img
          src={content[activeIndex]?.image}
          alt={content[activeIndex]?.title}
          className="w-full h-[500px] object-cover rounded-xl shadow-lg"
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

      {/* Navigation Bar */}
      <div className="mt-10 flex justify-center gap-6 border-t pt-6">
      {content.map((item, index) => (
  <button
    key={item.id || `brand-${index}`} // Fallback key if item.id is missing
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
