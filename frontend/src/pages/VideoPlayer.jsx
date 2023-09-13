import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CurrentVideosContext from "../../contexts/videosContext";
import Slider from "../components/Slider";
import Comment from "../components/Comment";
import VideoPlay from "../components/VideoPlay";

function VideoPlayer() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { selectedId, videoDate } = useContext(CurrentVideosContext);

  const [videoPlayed, setVideoPlayed] = useState([]);
  const [currentVideoComments, setCurrentVideoComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/videos/infos/${selectedId}`)
      .then((response) => {
        setVideoPlayed(response.data);
      })
      .catch((err) => console.error(err));
  }, [selectedId]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/videos/infos/${selectedId}`)
      .then((res) => res.json())
      .then((videos) => setCurrentVideoComments(videos.comment));
  }, [selectedId]);
  return (
    <div className="player-page">
      <VideoPlay video={videoPlayed} videoDate={videoDate} />
      <Slider />
      <Comment
        currentVideoComments={currentVideoComments}
        setCurrentVideoComments={setCurrentVideoComments}
      />
    </div>
  );
}

export default VideoPlayer;
