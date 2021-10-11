import React from "react";
import {connect} from "react-redux";
import queryString from 'query-string';
import * as actions from "../store/actions/index";
import BookmarkList from "../components/BookmarkList";
import TagList from "../components/TagsList";
import BookmarksSearch from "../components/BookmarksSearch";
import NewBookmarkForm from "../components/NewBookmarkForm";

class AddBookmarkContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllTags();
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-9">
            <NewBookmarkForm {...this.props}/>

          </div>
          <div className="col-md-3">
              <TagList tags={this.props.tags}/>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  const { tags } = state.bookmarks;
  return {
    tags: tags
  };
};

const mapDispatchToProps = dispatch => ({
  createBookmark: (bookmark) => dispatch(actions.createBookmark(bookmark)),
  fetchAllTags: () => dispatch(actions.fetchAllTags())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBookmarkContainer);
