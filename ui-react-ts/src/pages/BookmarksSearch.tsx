import React, {useEffect, useState} from 'react';
import {BookmarkListModel, TagModel} from "../models/Models";
import * as api from "../services/api";
import BookmarkList from "../components/BookmarkList";
import TagsList from "../components/TagsList";
import BookmarksSearchForm from "../components/BookmarksSearchForm";
import { RouteComponentProps, useLocation } from 'react-router-dom';

interface BookmarksSearchProps extends RouteComponentProps<any> {
}

const BookmarksSearch: React.FC<BookmarksSearchProps> = (props: BookmarksSearchProps): JSX.Element => {

  const initialData = {
    data: [],
    pageNumber: 1,
    totalPages:1,
    hasNext: false,
    hasPrevious: false
  };
  const search = useLocation().search;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<BookmarkListModel>(initialData);
  const [tags, setTags] = useState<TagModel[]>([]);

  const fetchAllTags = () => {
    api.fetchAllTags()
      .then(response => {
        setTags(response.data)
      })
      .catch(e => console.log("error", e));
  }

  const searchBookmarks = (pageNumber: number, queryValue: string) => {
    api.searchBookmarks(pageNumber, queryValue)
      .then(response => {
        setBookmarks(response.data)
      })
      .catch(e => console.log("error", e));
  }

  useEffect(()=>{
    const pageVal = new URLSearchParams(search).get("page");
    const queryVal = new URLSearchParams(search).get("query");
    setPage(parseInt(pageVal as string) || 1)
    setQuery(queryVal || "")
    fetchAllTags();
    if(query)
    {
      searchBookmarks(page, query)
    }
  }, [page, query, search]);

  return (
    <div className="row">
      <div className="col-md-9">
        <BookmarksSearchForm {...props} />
        <BookmarkList basePath={'/bookmarks/search'} {...bookmarks} />
      </div>
      <div className="col-md-3">
        <TagsList data={tags}/>
      </div>
    </div>
  );
}

export default BookmarksSearch;
