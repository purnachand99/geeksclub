import React from "react";
import Bookmark from "./Bookmark";
import Pagination from "./Pagination";

const bookmarkList = props => (
    <div className={"container"}>
      {props.bookmarks.totalPages > 1 && <Pagination {...props}/> }
      <div className="row">
            {props.bookmarks.data.length === 0 &&
            <div className={"container"}>
                <h3>No bookmarks found</h3>
            </div>
            }
            {props.bookmarks.data.map(p => {
              return (
                <Bookmark key={p.id} bookmark={p} />
              );
            })}
      </div>
        {props.bookmarks.totalPages > 1 && <Pagination {...props}/> }
    </div>
);

export default bookmarkList;
