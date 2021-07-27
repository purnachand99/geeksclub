import React from "react";
import {NavLink} from "react-router-dom";
import {cleanState, isAuthenticated} from "../services/localStorage";

class NavBar extends React.Component {

  logoutHandler = () => {
        cleanState();
        window.location = "/";
    };

  render() {
      let authenticatedLinks;

      if (isAuthenticated()) {
          authenticatedLinks = (
              <>
              <li className="nav-item">
              <NavLink className="nav-link" to="/bookmarks/add">
                Add Bookmark
              </NavLink>
              </li>
              <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={this.logoutHandler}>
                      Logout
                  </NavLink>
              </li>
              </>
          );
      } else {
          authenticatedLinks = (
              <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                      Login
                  </NavLink>
              </li>
          );
      }

    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <NavLink className="navbar-brand" to="/">
          Bookmarks
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            {/*<li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>*/}
          </ul>
          <ul className="navbar-nav">

              {authenticatedLinks}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
