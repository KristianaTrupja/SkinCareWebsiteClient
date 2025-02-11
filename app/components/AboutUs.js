"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AboutUs = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("http://localhost:5000/about-us/get-about-us")
        setData(response.data.content)
      } catch (err) {
        console.error('Error fetching content:', err);
      }
    }
    fetchContent()
  }, []) // Add dependency to avoid infinite loop

  return (
    <section className="relative w-full max-w-5xl mx-auto py-16 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-goldenYellow mb-4">
            {data[0]?.title}
          </h2>
          <p className="text-black leading-relaxed">
            {data[0]?.description}
          </p>

          <button className="mt-6 bg-[var(--peach-orange)] text-white px-5 py-2 rounded-lg shadow-md transition hover:bg-rosy">
            {data[0]?.button}
          </button>
        </div>

        {/* Right Section: Image */}
        <div className="relative">
          <img
            src={data[0]?.image}
            alt="Our Team"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutUs
