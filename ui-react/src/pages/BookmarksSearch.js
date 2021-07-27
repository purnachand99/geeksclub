import React from "react";
import queryString from 'query-string';
import BookmarkList from "../components/BookmarkList";
import TagList from "../components/TagsList";
import BookmarksSearchForm from "../components/BookmarksSearchForm";
import * as api from "../services/api";

class BookmarksSearch extends React.Component {

  constructor(props) {
    super(props);
    const values = queryString.parse(this.props.location.search);
    this.state = {
      bookmarks: {data: []},
      tags: [],
      page: values.page || 1,
      query: values.query || ""
    };
  }

  componentDidMount() {
    this.fetchAllTags();
    this.searchBookmarks(this.state.page, this.state.query)
  }

  fetchAllTags = () => {
    api.fetchAllTags()
      .then(response => {
        this.setState({tags: response.data})
      })
      .catch(e => console.log("error", e));
  }

  searchBookmarks = (page, query) => {
    api.searchBookmarks(page, query)
        .then(response => {
          console.log("search results: ", response)
          this.setState({bookmarks: response.data})
        })
        .catch(e => console.log("error", e));
    };

  render() {
    return (
        <div className="row">
          <div className="col-md-9">
            <BookmarksSearchForm {...this.props}/>

            <BookmarkList
              bookmarks={this.state.bookmarks}
              basePath={"/bookmarks/search"}
              query={this.state.query === ""? "": this.state.query}
            />
          </div>
          <div className="col-md-3">
              <TagList tags={this.state.tags}/>
          </div>
        </div>
    );
  }
}

export default BookmarksSearch;
