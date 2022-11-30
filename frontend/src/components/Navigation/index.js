import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
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
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    let credential = "demo@user.io";
    let password = "password";
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <div className="nav-section">
        <button className="demo-login-btn" onClick={handleSubmit}>
          DEMO-USER
        </button>
        <button
          className="menu-btn"
          onClick={() => setShowMenu(showMenu ? false : true)}
        >
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
