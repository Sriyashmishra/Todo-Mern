import React from "react";
import { PiBookBookmarkFill } from "react-icons/pi";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch(); 

  const logout = () => {
    sessionStorage.clear(); 
    dispatch(authActions.logout());  
  };
 
  // Helper function to auto-close the navbar on mobile click
  const closeNavbar = () => {
    const navbar = document.getElementById("navbarSupportedContent");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };
 
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>
          <PiBookBookmarkFill className="todo-icon" /> <b>TODO</b>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}><b>Home</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeNavbar}><b>About Us</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todo" onClick={closeNavbar}><b>Todo</b></Link>
            </li>
            
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link btn-nav-primary btn-nav" to="/signup" onClick={closeNavbar}>
                    <b>SignUp</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn-nav-primary mx-lg-2 btn-nav" to="/signin" onClick={closeNavbar}>
                    <b>SignIn</b>
                  </Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li className="nav-item" onClick={() => { logout(); closeNavbar(); }}>
                <Link className="nav-link btn-nav-secondary btn-nav" to="/">
                  <b>LogOut</b> 
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;