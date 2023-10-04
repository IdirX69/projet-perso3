import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryBox from "./CategoryBox";

function SliderCategory({ setSelectedCategory }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [categorySlider, setCategorySlider] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/category/`)
      .then((response) => {
        setCategorySlider(response.data);
      })
      .catch((err) => console.error(err));
  }, [setCategorySlider]);
  return (
    <div className="slider-container">
      <h2>Catégories</h2>

      <div className="slider-wrapper">
        {categorySlider?.map((category) => (
          <CategoryBox
            key={category.id}
            category={category}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>
    </div>
  );
}

export default SliderCategory;
