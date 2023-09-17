import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../asset/image/digital.png";
import CurrentUserContext from "../../contexts/userContext";

function Header() {
  const { user } = useContext(CurrentUserContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className="header-container">
      <img className="container-logo" src={logo} alt="logo" />
      <div className="arrow" />
      <nav>
        <NavLink to="/">
          <li>Acceuil</li>
        </NavLink>
        <NavLink to="/favorites">
          <li>Favoris</li>
        </NavLink>
        <NavLink to="/search">
          <li>Videos</li>
        </NavLink>
      </nav>

      <div className="profil-img">
        <NavLink to="/login">
          <img
            src={`${BACKEND_URL}/api/avatars/${user.avatar}`}
            alt={`${user.firstname}'s avatar`}
          />
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
