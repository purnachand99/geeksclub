import React, {useEffect, useState} from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import {BookmarkListModel, TagModel} from "../models/Models";
import * as api from "../services/api";
import BookmarkList from "../components/BookmarkList";
import TagsList from "../components/TagsList";
import BookmarksSearchForm from "../components/BookmarksSearchForm";

interface BookmarksProps extends RouteComponentProps<any> {
}

const Bookmarks: React.FC<BookmarksProps> = (props: BookmarksProps): JSX.Element => {
  const initialData = {
    data: [],
    pageNumber: 1,
    totalPages:1,
    hasNext: false,
    hasPrevious: false
  };
  const search = useLocation().search;
  const [page, setPage] = useState(1);
  const [bookmarks, setBookmarks] = useState<BookmarkListModel>(initialData);
  const [tags, setTags] = useState<TagModel[]>([]);

  const fetchAllTags = () => {
    api.fetchAllTags()
      .then(response => {
        setTags(response.data)
      })
      .catch(e => console.log("error", e));
  }

  const fetchBookmarks = (pageNumber: number) => {
    api.fetchBookmarks(pageNumber)
      .then(response => {
        setBookmarks(response.data)
      })
      .catch(e => console.log("error", e));
  }

  useEffect(()=>{
    const pageVal = new URLSearchParams(search).get("page");
    setPage(parseInt(pageVal as string) || 1)
    fetchAllTags();
    fetchBookmarks(page)
  }, [page, search]);

  return (
    <div className="row">
      <div className="col-md-9">
        <BookmarksSearchForm {...props}/>
        <BookmarkList {...bookmarks} basePath={'/bookmarks'}/>
      </div>
      <div className="col-md-3">
        <TagsList data={tags}/>
      </div>

    </div>
  );
}

export default Bookmarks;
