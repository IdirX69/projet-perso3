import React from "react";
import { ToastContainer } from "react-toastify";

import Carrousel from "../components/Carrousel";
import Slider from "../components/Slider";
import SliderLastVideos from "../components/SliderLastVideos";
import SliderCategory from "../components/SliderCategory";

function Home({ setSelectedCategory }) {
  return (
    <div className="home-container">
      <Carrousel />
      <SliderCategory setSelectedCategory={setSelectedCategory} />
      <SliderLastVideos />
      <Slider />
      <ToastContainer />
    </div>
  );
}

export default Home;
