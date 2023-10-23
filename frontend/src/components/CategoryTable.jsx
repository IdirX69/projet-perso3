/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryBox from "./CategoryBox";

function CategoryTable() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const [allCategory, setAllCategory] = useState([]);
  const [modif, setModif] = useState(false);

  useEffect(() => {
    axios
      .get(`${backUrl}/api/category`)
      .then((res) => setAllCategory(res.data))
      .catch((err) => console.error(err));
  }, [modif, setModif]);

  // const deleteCategory = (id) => {
  //   axios
  //     .delete(`${backUrl}/api/category/${id}`)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.error(err));
  // };
  // const modifyCategory = (id) => {
  //   axios
  //     .put(`${backUrl}/api/category/${id}`, modifiedCategory)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.error(err));
  // };

  return (
    <>
      <h1>Category List</h1>
      <div className="category-list">
        <div>
          {allCategory?.map((el) => (
            <CategoryBox key={el.id} category={el} />
          ))}
        </div>
        <div>
          <button type="button">Delete</button>
          <button type="button">Edit</button>
        </div>
      </div>
    </>
  );
}

export default CategoryTable;
