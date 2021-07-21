import React from "react";
import Layout from "../../components/Layout";
import Bookmarks from "../../components/Bookmarks";
import TagsNav from "../../components/TagsNav";
import { getBookmarksByTag, getTags } from '../../services/api'

function Tag({ bookmarks, tags, slug }) {
    return (
        <Layout title={"Home"}>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <Bookmarks bookmarks={bookmarks} path={'/tags/'+slug}/>
                    </div>
                    <div className="col-4">
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
    const bookmarks = await getBookmarksByTag(slug, page)
    const tags = await getTags()

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
