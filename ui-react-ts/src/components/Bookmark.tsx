import React from "react";
import {NavLink} from "react-router-dom";
import {BookmarkModel} from '../models/Models'

const Bookmark: React.FC<BookmarkModel> = (bookmark: BookmarkModel): JSX.Element =>  {

  return (
    <div className="col-12">
      <div className="alert alert-primary" role="alert">
        <h5>
          <a href={bookmark.url} target={'_blank'} rel="noreferrer">
            {bookmark.title}
          </a>
        </h5>
        <p className={"mb-0"}>
          { bookmark.tags.map(tag =>
            <span key={tag} style={{paddingRight: "10px"}}>
               <NavLink to={`/tags?tag=${tag}`}>
                 <span className="badge badge-primary" style={{fontSize: "15px"}}>{tag}</span>
               </NavLink>
              </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default Bookmark;
