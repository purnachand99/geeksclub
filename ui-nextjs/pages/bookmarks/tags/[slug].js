import React from "react";
import Layout from "../../../components/Layout";
import Bookmarks from "../../../components/Bookmarks";
import TagsNav from "../../../components/TagsNav";
import { fetchBookmarksByTag, fetchAllTags } from '../../../services/api'
import BookmarksSearchForm from "../../../components/BookmarksSearchForm";

function Tag({ bookmarks, tags, slug }) {
    return (
        <Layout title={"Bookmarks By Tag"}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-9">
                        <BookmarksSearchForm />
                        <Bookmarks bookmarks={bookmarks} path={'/bookmarks/tags/'+slug}/>
                    </div>
                    <div className="col-3">
                        <TagsNav tags={tags}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const { page = 1 } = context.query;
    const bookmarks = await fetchBookmarksByTag(slug, page)
    const tags = await fetchAllTags()

    return {
        props: {
            slug,
            page,
            bookmarks,
            tags
        }
    }
}

export default Tag;
