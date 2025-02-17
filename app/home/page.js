import React from 'react'
import Stage from '../components/content/Stage'
import AboutUs from '../components/content/AboutUs'
import Services from '../components/content/Services'
import Products from '../components/content/Products'
import Brands from '../components/content/Brands'
import VideoLayer from '../components/ui/VideoLayer'

function Home() {
  return (
    <div>
      <Stage/>
      <AboutUs/>
      <Services/>
      <VideoLayer imageSrc="https://t3.ftcdn.net/jpg/06/19/58/80/360_F_619588022_49HMcpy54VAG371u6JjDN3bNSHQwwfee.jpg" altText="Sample Video" videoSrc="/video.mp4"/>
      <Products/>
      <Brands/>
    </div>
  )
}

export default Home
