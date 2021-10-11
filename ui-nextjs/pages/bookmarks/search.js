import React from "react";
import Layout from "../../components/Layout";
import Bookmarks from "../../components/Bookmarks";
import TagsNav from "../../components/TagsNav";
import { searchBookmarks, fetchAllTags } from '../../services/api'
import BookmarksSearchForm from "../../components/BookmarksSearchForm";

function Search({ bookmarks, tags }) {
  return (
    <Layout title={"Search"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-9">
            <BookmarksSearchForm />
            <Bookmarks bookmarks={bookmarks} path={'/bookmarks'}/>
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
  const { page = 1, query = "" } = context.query;
  const bookmarks = await searchBookmarks(query, page)
  const tags = await fetchAllTags()

  return {
    props: {
      bookmarks,
      tags
    }
  }
}

export default Search;
