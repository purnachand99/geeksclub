import React from "react";
import { NavLink } from "react-router-dom";

const bookmark = props => (
    <div className="col-12">
        <div className="alert alert-primary" role="alert">
            <h5>
                <NavLink to={props.bookmark.url}>
                    {props.bookmark.title}
                </NavLink>
            </h5>
        </div>
    </div>
);
export default bookmark;
