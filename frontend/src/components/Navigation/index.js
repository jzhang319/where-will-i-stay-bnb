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
        <a>{sessionUser && <CreateFormModal />}</a>
        <a>
          <LoginFormModal />
        </a>
      </>
    );
  }

  const [showMenu, setShowMenu] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleDemoUser = (e) => {
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
  let hideButton;
  if (sessionUser) {
    hideButton = true;
  } else {
    hideButton = false;
  }

  return (
    <>
      <div className="nav-section">
        <NavLink to="/">
          <img src={logo} alt="page-logo" className="logo" />
        </NavLink>
        <button className="curr-owner-spot-btn" onClick={goNew}>
          <NavLink exact to="/spots/current">
            Current Owner Spots
          </NavLink>
        </button>
        <button
          hidden={hideButton}
          className="demo-login-btn"
          onClick={handleDemoUser}
        >
          <i className="fa-solid fa-user"></i>
          DEMO-LOGIN
        </button>
        <div className="join-bnb-section">
          {sessionUser && <CreateFormModal />}
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            <i className="fa-solid fa-bars"></i>
            <i className="fa-solid fa-user"></i>
          </button>
          <div className="dropdown-content">
            <a>
              <NavLink exact to="/">
                Home
              </NavLink>
            </a>
            <a>{isLoaded && sessionLinks}</a>
            <a>
              <NavLink to="/signup">Sign Up</NavLink>
            </a>
          </div>
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
