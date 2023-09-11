import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/userContext";

function Navbar() {
  const { user } = useContext(CurrentUserContext);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {user.email ? (
        <div className="navigation">
          <ul>
            <NavLink to="/">
              <li className="home" />
            </NavLink>
            <NavLink to="/search">
              <li className="search" />
            </NavLink>
            <NavLink to="/favorites">
              <li className="library" />
            </NavLink>
            <NavLink to="/login">
              <li className="profil" />
            </NavLink>
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
