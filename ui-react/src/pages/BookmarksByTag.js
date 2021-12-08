import React from "react";
import queryString from 'query-string';
import BookmarkList from "../components/BookmarkList";
import TagList from "../components/TagsList";
import BookmarksSearchForm from "../components/BookmarksSearchForm";
import * as api from "../services/api";

class BookmarksByTag extends React.Component {

  constructor(props) {
    super(props);
    const values = queryString.parse(this.props.location.search);
    this.state = {
      tags: [],
      bookmarks: {data:[]},
      page: values.page || 1,
      tag: values.tag
    };
  }

  componentDidMount() {
    this.fetchAllTags();
    this.fetchBookmarksByTag(this.state.page, this.state.tag)
  }

  fetchAllTags = () => {
    api.fetchAllTags()
      .then(response => {
        this.setState({tags: response.data})
      })
      .catch(e => console.log("error", e));
  }

  fetchBookmarksByTag = (page, tag) => {
    api.fetchBookmarksByTag(page, tag)
        .then(response => {
          this.setState({bookmarks: response.data})
        })
        .catch(e => console.log("error", e));
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-9">
            <BookmarksSearchForm {...this.props}/>

            <BookmarkList
              bookmarks={this.state.bookmarks}
              basePath={"/tags"}
              tag={this.state.tag}

            />
          </div>
          <div className="col-md-3">
            <TagList tags={this.state.tags}/>
          </div>
        </div>
    );
  }
}

export default BookmarksByTag;
