import React from "react";
import Favorites from "../components/Favorites";
import ReturnPageButton from "../components/ReturnPageButton";

function Library() {
  return (
    <div className="libraryContainer">
      <ReturnPageButton />
      <h2>Bibliothèque</h2>
      <div className="libraryPage">
        <Favorites />
      </div>
    </div>
  );
}

export default Library;
