import React from "react";
import { NavLink } from "react-router-dom";

function CategoryBox({ category, setSelectedCategory }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { img, id, name } = category;

  return (
    <div className="category-box">
      <NavLink to="/search" onClick={() => setSelectedCategory(String(id))}>
        <img src={`${BACKEND_URL}/api/videos/${img}`} alt={name} />
      </NavLink>
    </div>
  );
}

export default CategoryBox;
