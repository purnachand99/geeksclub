import React, {useEffect, useState} from "react";
import Link from 'next/link'
import { isAuthenticated } from '../services/localStorage';
import {cleanState} from "../services/localStorage";

const Header = () => {
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true)
  },[]);
  let isLoggedIn = isAuthenticated()
  //console.log('isLoggedIn', isLoggedIn)
  let logoutHandler = () => {
    cleanState();
    window.location = "/";
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <Link href={'/bookmarks'}><a className="navbar-brand" >GeeksClub</a></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse" aria-controls="navbarCollapse"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link href={'/bookmarks'}><a className="nav-link active" aria-current="page" >Home</a></Link>
              </li>
            </ul>
            {clientSide && <ul className="navbar-nav">
              {isLoggedIn && <>
                <li className="nav-item" key={"add-bookmark"}>
                  <Link href={'/bookmarks/add'}><a className="nav-link">Add</a></Link>
                </li>
                <li className="nav-item" key={"logout"}>
                  <Link href={'/'}><a className="nav-link" onClick={logoutHandler}>Logout</a></Link>
                </li>
              </>
              }
              {!isLoggedIn && <>
                <li className="nav-item" key={"login"}>
                  <Link href={'/login'}><a className="nav-link">Login</a></Link>
                </li>
                <li className="nav-item" key={"register"}>
                  <Link href={'/register'}><a className="nav-link">Register</a></Link>
                </li>
              </>
              }
            </ul>
            }
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
