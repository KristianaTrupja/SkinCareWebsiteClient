"use client"

import React, { useState } from 'react';
import axios from 'axios';

const AboutUsEditor = () => {
  const [content, setContent] = useState({
    title: '',
    description: '',
    button: '',
    image: '',
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
      const response = await axios.post('http://localhost:5000/about-us/create-about-us', content); 
      alert('Content created successfully!');
      
      // Reset form after successful submission
      setContent({
        title: '',
        description: '',
        button: '',
        image: '',
      });
    } catch (error) {
      console.error('Error creating content:', error);
      alert('Error creating content');
    }
  };

  return (
        <div className="bg-white w-full p-8 border-2 border-solid border-primary">
          <h1 className="text-3xl font-semibold text-center text-softGold mb-6">About Us Content Editor</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
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
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                value={content.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="button" className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                name="button"
                id="button"
                value={content.button}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                name="image"
                id="image"
                value={content.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="w-full bg-softCoral text-white py-2 rounded-md hover:bg-peach transition duration-200">
              Create Content
            </button>
          </form>
        </div>
  );
};

export default AboutUsEditor;
