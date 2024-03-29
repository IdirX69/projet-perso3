import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import ResetPassword from "../pages/ResetPassword";
import Home from "../pages/Home";
import Library from "../pages/Library";
import SearchPage from "../pages/SearchPage";
import ProfilePage from "../pages/ProfilePage";
import VideoPlayer from "../pages/VideoPlayer";
import FavPage from "../pages/FavPage";
import PlaylistPage from "../pages/PlaylistPage";
import Register from "./Register";
import Upload from "./Upload";
import UsersTable from "./UsersTable";
import VideosTable from "./VideosTable";
import AddCategory from "./AddCategory";
import ForgottenPassword from "../pages/ForgottenPassword";
import CurrentUserContext from "../../contexts/userContext";

export default function Routing() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useContext(CurrentUserContext);

  return (
    <Routes>
      {!user.email ? (
        <>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/login" element={<ProfilePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgottenPassword />} />
          <Route
            path="/api/resetpassword/:passwordToken"
            element={<ResetPassword />}
          />
        </>
      ) : (
        <>
          <Route
            path="/"
            element={<Home setSelectedCategory={setSelectedCategory} />}
          />
          <Route path="/saved" element={<Library />} />
          <Route path="/favorites" element={<FavPage />} />
          <Route path="/myPlaylist" element={<PlaylistPage />} />
          <Route
            path="/search"
            element={
              <SearchPage
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            }
          />
          <Route path="/login" element={<ProfilePage />} />
          <Route path="/player" element={<VideoPlayer />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/usersManagement" element={<UsersTable />} />
          <Route path="/videosManagement" element={<VideosTable />} />
          <Route path="/addCategory" element={<AddCategory />} />
        </>
      )}
    </Routes>
  );
}
