import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Bookmarks from "./pages/Bookmarks";
import BookmarksSearch from "./pages/BookmarksSearch";
import BookmarksByTag from "./pages/BookmarksByTag";
import AddBookmark from "./pages/AddBookmark";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <main role="main" className="container-fluid">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <Route exact path="/">
               <Redirect to="/bookmarks" />
            </Route>
            <Route path="/bookmarks/search" render={(props) => (
              <BookmarksSearch key={props.location.search} {...props} />)
            } />
            <Route path="/bookmarks/add" component={AddBookmark} />
            <Route path="/bookmarks" render={(props) => (
                <Bookmarks key={props.location.search} {...props} />)
            } />
            <Route path="/tags" render={(props) => (
                <BookmarksByTag key={props.location.search} {...props} />)
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
