"use client";

import React, { useState } from "react";
import axios from "axios";

const FoundationEditor = () => {
  const [content, setContent] = useState({
    category: "",
    code: "",
    title: "",
    shortdescription: "",
    ingredients: "",
    benefits: "",
    mrp: "",
    sp: "",
    discountPercent: "",
    imagePath: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5004/foundation",
        content
      );
      alert("Content created successfully!");

      // Reset form after successful submission
      setContent({
        category: "",
        code: "",
        title: "",
        shortdescription: "",
        ingredients: "",
        benefits: "",
        mrp: "",
        sp: "",
        discountPercent: "",
        imagePath: "",
      });
    } catch (error) {
      console.error("Error creating content:", error);
      alert("Error creating content");
    }
  };
console.log(content,"content");

  return (
    <div className="bg-white w-full p-8 border-2 border-solid border-primary">
      <h1 className="text-3xl font-semibold text-center text-softGold mb-6">
        Foundation Content Editor
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
      <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={content.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Code
          </label>
          <input
            type="text"
            name="code"
            id="code"
            value={content.code}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={content.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="shortdescription"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Short Description
          </label>
          <input
            type="text"
            name="shortdescription"
            id="shortdescription"
            value={content.shortdescription}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ingredients
          </label>
          <input
            type="text"
            name="ingredients"
            id="ingredients"
            value={content.ingredients}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="benefits"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Benefits
          </label>
          <input
            type="text"
            name="benefits"
            id="benefits"
            value={content.benefits}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="mrp"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mrp
          </label>
          <input
            type="number"
            name="mrp"
            id="mrp"
            value={content.mrp}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="sp"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sp
          </label>
          <input
            type="number"
            name="sp"
            id="sp"
            value={content.sp}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="discountPercent"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Discount Percent
          </label>
          <input
            type="number"
            name="discountPercent"
            id="discountPercent"
            value={content.discountPercent}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="imagePath"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image URL
          </label>
          <input
            type="text"
            name="imagePath"
            id="imagePath"
            value={content.imagePath}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-softCoral text-white py-2 rounded-md hover:bg-peach transition duration-200"
        >
          Create Content
        </button>
      </form>
    </div>
  );
};

export default FoundationEditor;
