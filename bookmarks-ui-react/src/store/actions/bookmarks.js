import axios from "./axios";

export const RECEIVE_BOOKMARKS = "RECEIVE_BOOKMARKS";
export const RECEIVE_ALL_TAGS = "RECEIVE_ALL_TAGS";

export function fetchBookmarks(page) {
  let queryString = "?page="+page;
  return dispatch => {
    return axios(`/api/bookmarks`+queryString)
      .then(response => {
        return dispatch({
          type: RECEIVE_BOOKMARKS,
          payload: response.data
        });
      })
      .catch(e => console.log("error", e));
  };
}

export function searchBookmarks(page, query) {
    let queryString = "?page="+page;
    if(query !== "") {
        queryString+="&query="+query;
    }
    return dispatch => {
        return axios(`/api/bookmarks/search`+queryString)
            .then(response => {
                return dispatch({
                    type: RECEIVE_BOOKMARKS,
                    payload: response.data
                });
            })
            .catch(e => console.log("error", e));
    };
}

export function fetchBookmarksByTag(page, tag) {
    return dispatch => {
        return axios(`/api/tags/${tag}?page=${page}`)
            .then(response => {
                return dispatch({
                    type: RECEIVE_BOOKMARKS,
                    payload: response.data
                });
            })
            .catch(e => console.log("error", e));
    };
}

export function fetchAllTags() {
    return dispatch => {
        return axios(`/api/tags`)
            .then(response => {
                return dispatch({
                    type: RECEIVE_ALL_TAGS,
                    payload: response.data
                });
            })
            .catch(e => console.log("error", e));
    };
}
