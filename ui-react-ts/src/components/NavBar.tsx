import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {cleanState, isAuthenticated} from "../services/localStorage";

const NavBar: React.FC = (): JSX.Element =>  {
  const [authenticated, setAuthenticate] = useState(false);

  const logoutHandler = (): void => {
    cleanState();
    window.location.href = "/";
  };

 useEffect(() => {
   console.log("get auth state");
   setAuthenticate(isAuthenticated);
 }, []);

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
          <span className="navbar-toggler-icon"/>
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
            {authenticated &&
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/bookmarks/add">
                  Add Bookmark
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={logoutHandler}>
                  Logout
                </NavLink>
              </li>
            </>
            }

            {!authenticated &&
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </>
            }
          </ul>
        </div>
      </nav>
    );
}

export default NavBar;
