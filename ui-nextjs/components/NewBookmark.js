import React from "react";
import { useState } from 'react';

const NewBookmark = ({createBookmarkHandler}) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [tags, setTags] = useState("");
    const [message, setMessage] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(title === "" || url === "") {
            return;
        }
        const payload = {
            title,
            url,
            tags
        }

        const response = await createBookmarkHandler(payload)
        console.log("Add bookmark response: ", response)
        setMessage("Bookmark saved successfully")
        setTitle("");
        setUrl("");
        setTags("");
    }

    return (
        <div>
            <h2>NewBookmark</h2>
            {message && <div className="alert alert-primary" role="alert">{message}</div> }
            <form onSubmit={e => {handleSubmit(e)}}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="url" className="form-label">URL</label>
                    <input type="text" className="form-control" id="url" value={url} onChange={e => setUrl(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tags" value={tags} onChange={e => setTags(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default NewBookmark;
