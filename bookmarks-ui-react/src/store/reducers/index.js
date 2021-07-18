import {combineReducers} from "redux";
import userReducer from "./user";
import bookmarksReducer from "./bookmarks";

export default combineReducers({
  user: userReducer,
  bookmarks: bookmarksReducer
});
