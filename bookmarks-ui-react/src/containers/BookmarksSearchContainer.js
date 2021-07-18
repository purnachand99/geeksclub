import React from "react";
import {connect} from "react-redux";
import queryString from 'query-string';
import * as actions from "../store/actions/index";
import BookmarkList from "../components/BookmarkList";
import TagList from "../components/TagsList";
import BookmarksSearch from "../components/BookmarksSearch";

class BookmarksSearchContainer extends React.Component {

  constructor(props) {
    super(props);
    const values = queryString.parse(this.props.location.search);
    this.state = {
      page: values.page || 1,
      query: values.query || ""
    };
  }

  componentDidMount() {
    this.props.fetchAllTags();
    this.props.searchBookmarks(this.state.page, this.state.query)
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-9">
            <BookmarksSearch {...this.props}/>

            <BookmarkList
              bookmarks={this.props.bookmarks}
              basePath={"/bookmarks/search"}
              query={this.state.query === ""? "": this.state.query}
            />
          </div>
          <div className="col-md-3">
              <TagList tags={this.props.tags}/>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  const { bookmarks, tags } = state.bookmarks;
  return {
    bookmarks: bookmarks,
    tags: tags
  };
};

const mapDispatchToProps = dispatch => ({
  searchBookmarks: (page, query) => dispatch(actions.searchBookmarks(page, query)),
  fetchAllTags: () => dispatch(actions.fetchAllTags())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarksSearchContainer);
