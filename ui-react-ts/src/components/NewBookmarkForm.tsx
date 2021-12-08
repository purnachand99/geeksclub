import React, {useState} from "react";
import {CreateBookmarkRequest} from "../models/Models";

interface NewBookmarkFormProps {
  createBookmarkHandler: (bookmark: CreateBookmarkRequest) => void
}

const NewBookmarkForm = (props: NewBookmarkFormProps) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit =  (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      return;
    }
    let tagsArray = tags === "" ? []: tags.split(",")
    props.createBookmarkHandler({ title: title, url: url, tags: tagsArray });
  };

  return (
    <div className="container  pb-3">
      <div className="card">
        <div className="card-header text-center">
          <h3>Add Bookmark Form</h3>
        </div>
        <div className="card-body">
          <form onSubmit={e => handleSubmit(e)} className="row justify-content-center">
            <div className="form-group col-md-10">
              <label htmlFor="url">URL</label>
              <input
                id="url"
                placeholder={"Enter the url"}
                className="form-control col-md-12"
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group col-md-10">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                placeholder={"Enter the title"}
                className="form-control col-md-12"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group col-md-10">
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                className="form-control col-md-12"
                type="text"
                placeholder={"comma separated list of tags"}
                value={tags}
                onChange={e => setTags(e.target.value)}
              />
            </div>
            <div className="form-group col-md-10">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBookmarkForm;
