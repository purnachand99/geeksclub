import axios from "./axios";

export function createBookmark(bookmark) {
  return axios.post(`/api/bookmarks`, bookmark);
}

export function fetchBookmarks(page) {
  let queryString = "?page="+page;
  return axios(`/api/bookmarks`+queryString);
}

export function searchBookmarks(page, query) {
  let queryString = "?page="+page;
  if(query !== "") {
    queryString+="&query="+query;
  }
  return axios(`/api/bookmarks/search`+queryString);
}

export function fetchBookmarksByTag(page, tag) {
  return axios(`/api/tags/${tag}?page=${page}`);
}

export function fetchAllTags() {
  return axios(`/api/tags`);
}

export function login(credentials) {
  return axios.post(`/api/auth/login`, credentials);
}

export function createUser(user) {
  return axios.post(`/api/users`, user);
}
