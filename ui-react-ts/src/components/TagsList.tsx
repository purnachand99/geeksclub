import React from "react";
import {NavLink} from "react-router-dom";
import {TagModel} from "../models/Models";

export interface TagsListProps {
  data: TagModel[]
}

const TagsList: React.FC<TagsListProps> = (tags: TagsListProps): JSX.Element =>  {
  return (
    <ul className="list-group list-group-flush">
      {tags.data.map(t => {
        return (
          <NavLink  key={t.id} className="list-group-item"
                    activeClassName={"myactive"}
                    to={'/tags?tag='+t.name}>{t.name}</NavLink>
        );
      })}

    </ul>
  );
}

export default TagsList;
