import React from "react";
import Link from 'next/link'

const Header = () => (
    <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <Link href={'/'}><a className="navbar-brand" >Bookmarks</a></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse" aria-controls="navbarCollapse"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link href={'/'}><a className="nav-link active" aria-current="page" >Home</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'/add'}><a className="nav-link" >Add</a></Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    </header>
);

export default Header;