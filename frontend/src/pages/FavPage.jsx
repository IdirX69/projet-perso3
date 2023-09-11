import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import VideoBox from "../components/VideoBox";
import ReturnPageButton from "../components/ReturnPageButton";
import CurrentUserContext from "../../contexts/userContext";
import Navbar from "../components/Navbar";

export default function FavPage() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { user } = useContext(CurrentUserContext);

  const [favortieVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/favoris/${user.id}`)
      .then((res) => res.json())
      .then((videos) => {
        setFavoriteVideos(videos);
      });
  }, [favortieVideos]);

  const deleteFav = (userId, videoId) => {
    if (favortieVideos.find((videos) => videos.id === videoId)) {
      axios.delete(`${BACKEND_URL}/api/favoris/${userId}/${videoId}`);
      fetch(`${BACKEND_URL}/api/favoris/${user.id}`)
        .then((res) => res.json())
        .then((videos) => {
          setFavoriteVideos(videos);
        });
    }
  };

  return (
    <div className="favorite-page-container">
      <ReturnPageButton />
      <h2>Favoris</h2>
      <div className="favorite-container">
        {favortieVideos.length > 0 ? (
          favortieVideos.map((video) => (
            <div className="favorite-box" key={video.id}>
              <VideoBox video={video} />
              <button
                className="favContainer"
                type="button"
                onClick={() => deleteFav(user.id, video.id)}
              >
                <li className="favorite" />
              </button>
            </div>
          ))
        ) : (
          <h4>Aucun favoris...</h4>
        )}
      </div>
      <Navbar />
    </div>
  );
}
