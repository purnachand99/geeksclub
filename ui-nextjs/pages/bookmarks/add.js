import React from "react";
import Layout from "../../components/Layout";
import NewBookmark from "../../components/NewBookmark";
import { createBookmark } from '../../services/api'

function AddBookmark() {
    return (
        <Layout title={"Add Bookmark"}>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <NewBookmark createBookmarkHandler={createBookmark}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AddBookmark;
