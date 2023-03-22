import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import CreateFormModal from "../CreateFormModal";
import "./Navigation.css";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import CurrentUserSpots from "../CurrentUserSpots";
import logo from "./logo.png";
import { emptyBookings, getBookingsWithSpotId } from "../../store/booking";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        {sessionUser && <CreateFormModal />}

        <LoginFormModal />
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(emptyBookings());
    // history.pushState("/");
  };

  return (
    <>
      <div className="nav-section">
        <NavLink to="/">
          <img src={logo} alt="page-logo" className="logo" />
        where-will-i-stay-bnb
        </NavLink>
        <NavLink exact to="/spots/current">
          <button
            hidden={!hideButton}
            className="curr-owner-spot-btn"
            onClick={goNew}
          >
            Current Owner Spots
          </button>
        </NavLink>
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
            <NavLink className="home-btn" exact to="/">
              Home
            </NavLink>

            {isLoaded && sessionLinks}

            {sessionUser && (
              <a className="logout-btn" onClick={logout}>
                Log Out
              </a>
            )}
            {!sessionUser && <NavLink to="/signup">Sign Up</NavLink>}
          </div>
        </div>
        {/* <button
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
        )} */}
      </div>
    </>
  );
}

export default Navigation;
