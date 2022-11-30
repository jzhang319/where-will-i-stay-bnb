import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </>
    );
  }

  const [showMenu, setShowMenu] = useState(false);

  

  return (
    <>
      <div className="nav-section">
        <button className="menu-btn" onClick={showMenu}>
          menu
        </button>
        {/* <ul className="nav-ul">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
            {isLoaded && sessionLinks}
          </li>
        </ul> */}
        {showMenu && (
          <ul className="nav-ul">
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
              {isLoaded && sessionLinks}
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default Navigation;
