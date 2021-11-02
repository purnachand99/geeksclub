import React from "react";
import TagList from "../components/TagsList";
import NewBookmarkForm from "../components/NewBookmarkForm";
import * as api from "../services/api"

class AddBookmark extends React.Component {

  constructor(props) {
    super(props);
    this.tags = []
  }

  componentDidMount() {
    this.fetchAllTags();
  }

  createBookmark = (bookmark) => {
    api.createBookmark(bookmark)
        .then(response => {
          console.log("saved bookmark successfully", response)
          window.location = "/";
        })
        .catch(e => console.log("error", e));
  };

  fetchAllTags = () => {
    api.fetchAllTags()
      .then(response => {
        this.setState({tags: response.data})
      })
      .catch(e => console.log("error", e));
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-9">
            <NewBookmarkForm createBookmarkHandler={this.createBookmark}/>

          </div>
          <div className="col-md-3">
              <TagList tags={this.tags}/>
          </div>
        </div>
    );
  }
}

export default AddBookmark;
