import React from "react";
import Stage from "../components/content/Stage";
import AboutUs from "../components/content/AboutUs";
import Services from "../components/content/Services";
import Products from "../components/content/Products";
import Brands from "../components/content/Brands";
import VideoLayer from "../components/ui/VideoLayer";

function Home() {
  return (
    <div>
      <Stage />
      <AboutUs />
      <Services />
      <VideoLayer
        imageSrc="https://t3.ftcdn.net/jpg/06/19/58/80/360_F_619588022_49HMcpy54VAG371u6JjDN3bNSHQwwfee.jpg"
        altText="Sample Video"
        videoSrc="/video.mp4"
      />
      <Products />
      <Brands />
      <a
  href="https://api.whatsapp.com/send?phone=0683295333"
  target="_blank"
  className="fixed bottom-10 right-10 w-24 z-30 animate-pulse transition-all duration-500 ease-in-out"
>
  <div className="relative">
    <div className="absolute inset-0 w-full h-full rounded-full bg-green-500 opacity-70 blur-lg animate-ping"></div>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png"
      className="relative w-full"
    />
  </div>
</a>

    </div>
  );
}

export default Home;
