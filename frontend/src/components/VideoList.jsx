import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoBox from "./VideoBox";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/videos`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="videosContainer">
      {videos.map((vid) => (
        <VideoBox video={vid} key={vid.id} />
      ))}
    </div>
  );
}

export default VideoList;
