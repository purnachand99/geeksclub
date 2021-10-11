import axios from "./axios";

export async function createBookmark(bookmark) {
    let res = await axios.post(`/api/bookmarks`, bookmark);
    return res.data;
}

export async function fetchBookmarks(page) {
    let queryString = "?page="+page;
    let res = await axios(`/api/bookmarks`+queryString);
    return res.data;
}

export async function searchBookmarks(page, query) {
    let queryString = "?page="+page;
    if(query !== "") {
        queryString+="&query="+query;
    }
    let res = await axios(`/api/bookmarks/search`+queryString);
    return res.data;
}

export async function fetchBookmarksByTag(tag, page) {
    let res = await axios(`/api/tags/${tag}?page=${page}`);
    return res.data;
}

export async function fetchAllTags() {
    let res = await axios(`/api/tags`);
    return res.data;
}

export async function login(credentials) {
    let res = await axios.post(`/api/auth/login`, credentials);
    return res.data;
}
