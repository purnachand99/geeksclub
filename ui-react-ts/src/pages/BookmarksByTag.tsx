import React, {useEffect, useState} from 'react';
import {BookmarkListModel, TagModel} from "../models/Models";
import * as api from "../services/api";
import BookmarkList from "../components/BookmarkList";
import TagsList from "../components/TagsList";
import BookmarksSearchForm from "../components/BookmarksSearchForm";
import { RouteComponentProps, useLocation } from 'react-router-dom';

interface BookmarksByTagProps extends RouteComponentProps<any> {
}

const BookmarksByTag: React.FC<BookmarksByTagProps> = (props: BookmarksByTagProps): JSX.Element => {

  const initialData = {
    data: [],
    pageNumber: 1,
    totalPages:1,
    hasNext: false,
    hasPrevious: false
  };
  const search = useLocation().search;
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("");
  const [bookmarks, setBookmarks] = useState<BookmarkListModel>(initialData);
  const [tags, setTags] = useState<TagModel[]>([]);

  const fetchAllTags = () => {
    api.fetchAllTags()
      .then(response => {
        setTags(response.data)
      })
      .catch(e => console.log("error", e));
  }

  const fetchBookmarksByTag = (pageNumber: number, tagValue: string) => {
    api.fetchBookmarksByTag(pageNumber, tagValue)
      .then(response => {
        console.log("fetchBookmarksByTag:", response);
        setBookmarks(response.data)
      })
      .catch(e => console.log("error", e));
  }

  useEffect(()=>{
    const pageVal = new URLSearchParams(search).get("page");
    const tagVal = new URLSearchParams(search).get("tag");
    setPage(parseInt(pageVal as string) || 1)
    setTag(tagVal || "")
    fetchAllTags();
    if(tag) {
      fetchBookmarksByTag(page, tag)
    }

  }, [page, tag, search]);

  return (
    <div className="row">
      <div className="col-md-9">
        <BookmarksSearchForm {...props} />
        <BookmarkList basePath={'/tags'} {...bookmarks} />
      </div>
      <div className="col-md-3">
        <TagsList data={tags}/>
      </div>
    </div>
  );
}

export default BookmarksByTag;
