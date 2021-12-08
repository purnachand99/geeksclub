import React from "react";
import Bookmark from "./Bookmark";
import Pagination from "./Pagination";
import {BookmarkListModel} from "../models/Models";

const BookmarkList: React.FC<BookmarkListModel> = (bookmarks: BookmarkListModel): JSX.Element =>  {
  console.log("BookmarkList:", bookmarks);
  return (
    <div className={"container"}>
      {bookmarks.totalPages > 1 && <Pagination {...bookmarks}/> }
      <div className="row">
        {bookmarks.data.length === 0 &&
        <div className={"container"}>
          <h3>No bookmarks found</h3>
        </div>
        }
        {bookmarks.data.map(p => {
          return (
            <Bookmark key={p.id}  {...p} />
          );
        })}
      </div>
      {bookmarks.totalPages > 1 && <Pagination {...bookmarks}/> }
    </div>
  );
}

export default BookmarkList;
