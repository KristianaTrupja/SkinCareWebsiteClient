"use client"
import { useState } from "react";

const VideoLayer = ({ imageSrc, videoSrc, altText }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    window.open(videoSrc, "_blank"); // Opens the video in a new tab
  };

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-[500px] mt-10">
      {!isPlaying ? (
        <div className="relative w-full h-full">
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-12 h-12"
            >
              <path
                d="M8 5v14l11-7z"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <video
            controls
            autoPlay
            className="w-full h-full object-cover rounded-lg"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoLayer;
