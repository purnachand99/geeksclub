import {RECEIVE_ALL_TAGS, RECEIVE_BOOKMARKS} from "../actions/bookmarks";

const initialState = {
  tags: [],
  bookmarks: { data: [] }
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BOOKMARKS:
      return Object.assign({}, state, {
        bookmarks: action.payload
      });
    case RECEIVE_ALL_TAGS:
      return Object.assign({}, state, {
        tags: action.payload
      });
    default:
      return state;
  }
}

export default reducer;
