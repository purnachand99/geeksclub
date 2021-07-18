import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import BookmarksContainer from "./containers/BookmarksContainer";
import BookmarksSearchContainer from "./containers/BookmarksSearchContainer";
import BookmarksByTagContainer from "./containers/BookmarksByTagContainer";
import AddBookmarkContainer from "./containers/AddBookmarkContainer";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <main role="main" className="container-fluid">
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/">
               <Redirect to="/bookmarks" />
            </Route>
            <Route path="/bookmarks/search" render={(props) => (
              <BookmarksSearchContainer key={props.location.search} {...props} />)
            } />
            <Route path="/bookmarks/add" component={AddBookmarkContainer} />
            <Route path="/bookmarks" render={(props) => (
                <BookmarksContainer key={props.location.search} {...props} />)
            } />
            <Route path="/tags" render={(props) => (
                <BookmarksByTagContainer key={props.location.search} {...props} />)
            } />
          </Switch>
        </main>
          <footer className="footer mt-auto py-3 text-center">
              <div className="container">
                  <span className="text-muted">SivaLabs &copy; 2021.</span>
              </div>
          </footer>
      </div>
    );
  }
}

export default App;
