import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import CreateFormModal from "../CreateFormModal";
import "./Navigation.css";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import CurrentUserSpots from "../CurrentUserSpots";
import logo from "./logo.png";

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
  const goNew = () => {
    <CurrentUserSpots />;
  };

  return (
    <>
      <div className="nav-section">
        <NavLink to="/">
          <img src={logo} alt="page-logo" className="logo" />
        </NavLink>
        <button className="demo-login-btn" onClick={handleSubmit}>
          <i className="fa-solid fa-user"></i>
          DEMO-USER
        </button>
        <button className="curr-owner-spot-btn" onClick={goNew}>
          <NavLink exact to="/spots/current">
            Current Owner Spots
          </NavLink>
        </button>
        <div className="join-bnb-section">
          {sessionUser && <CreateFormModal />}
        </div>
        <button
          className="menu-btn"
          onClick={() => setShowMenu(showMenu ? false : true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
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
