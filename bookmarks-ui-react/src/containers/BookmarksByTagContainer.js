import React from "react";
import {connect} from "react-redux";
import queryString from 'query-string';
import * as actions from "../store/actions/index";
import BookmarkList from "../components/BookmarkList";
import TagList from "../components/TagsList";
import BookmarksSearch from "../components/BookmarksSearch";

class BookmarksByTagContainer extends React.Component {

  constructor(props) {
    super(props);
    const values = queryString.parse(this.props.location.search);
    this.state = {
      page: values.page || 1,
      query: values.query || "",
      tag: values.tag
    };
  }

  componentDidMount() {
    this.props.fetchAllTags();
    this.props.fetchBookmarksByTag(this.state.page, this.state.tag)
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-9">
            <BookmarksSearch {...this.props}/>

            <BookmarkList
              bookmarks={this.props.bookmarks}
              basePath={"/tags"}
              tag={this.state.tag}

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
  fetchBookmarksByTag: (page, tag) => dispatch(actions.fetchBookmarksByTag(page, tag)),
  fetchAllTags: () => dispatch(actions.fetchAllTags())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarksByTagContainer);
