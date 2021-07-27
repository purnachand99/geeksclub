import React from "react";
import {NavLink} from "react-router-dom";

class TagsList extends React.Component {

    render() {
        return (
            <ul className="list-group list-group-flush">
                {this.props.tags.map(t => {
                    return (
                        <NavLink  key={t.id} className="list-group-item"
                                  activeClassName={"myactive"}
                                  to={'/tags?tag='+t.name}>{t.name}</NavLink>
                    );
                })}

            </ul>
        );
    }
}

export default TagsList;
