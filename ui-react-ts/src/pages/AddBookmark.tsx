import React, {useEffect, useState} from "react";
import TagsList from "../components/TagsList";
import NewBookmarkForm from "../components/NewBookmarkForm";
import * as api from "../services/api"
import {CreateBookmarkRequest, TagModel} from "../models/Models";

const AddBookmark = () => {

  const [tags, setTags] = useState<TagModel[]>([]);

  useEffect(()=>{
    fetchAllTags();
  }, []);

  const createBookmarkHandler = (bookmark: CreateBookmarkRequest) => {
    api.createBookmark(bookmark)
      .then(response => {
        console.log("saved bookmark successfully", response)
        window.location.href = "/";
      })
      .catch(e => console.log("error", e));
  };

  const fetchAllTags = () => {
    api.fetchAllTags()
      .then(response => {
        setTags(response.data)
      })
      .catch(e => console.log("error", e));
  }

  return (
    <div className="row">
      <div className="col-md-9">
        <NewBookmarkForm createBookmarkHandler={createBookmarkHandler}/>

      </div>
      <div className="col-md-3">
        <TagsList data={tags} />
      </div>
    </div>
  );

}

export default AddBookmark;
