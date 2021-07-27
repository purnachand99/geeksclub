import React from "react";
import Bookmark from "./Bookmark";
import Pagination from "./Pagination";

const Bookmarks = ({bookmarks, path}) => (
  <div>
      <div>
          <Pagination bookmarks={bookmarks} path={path}/>
          {bookmarks.data.map(bookmark => (<Bookmark key={bookmark.id} bookmark={bookmark} />))}
          <Pagination bookmarks={bookmarks} path={path}/>
      </div>
  </div>
);

export default Bookmarks;
