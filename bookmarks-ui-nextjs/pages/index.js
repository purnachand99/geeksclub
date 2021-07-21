import React from "react";
import Layout from "../components/Layout";
import Bookmarks from "../components/Bookmarks";
import TagsNav from "../components/TagsNav";
import { getBookmarks, getTags } from '../services/api'

function Home({ bookmarks, tags }) {
  return (
      <Layout title={"Home"}>
          <div className="container">
              <div className="row">
                  <div className="col-8">
                      <Bookmarks bookmarks={bookmarks} path={'/'}/>
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
    const { page = 1 } = context.query;
    const bookmarks = await getBookmarks(page)
    const tags = await getTags()

    return {
        props: {
            bookmarks,
            tags
        }
    }
}

export default Home;
