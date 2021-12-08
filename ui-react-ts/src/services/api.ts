import axios from "./axios";
import {
  BookmarkListModel,
  BookmarkModel, CreateBookmarkRequest,
  CreateUserRequest, CreateUserResponse,
  LoginRequest,
  LoginResponse,
  TagModel
} from "../models/Models";

export function createBookmark(bookmark: CreateBookmarkRequest) {
  return axios.post<BookmarkModel>(`/api/bookmarks`, bookmark);
}

export function fetchBookmarks(page: number) {
  let queryString = "?page="+page;
  return axios.get<BookmarkListModel>(`/api/bookmarks`+queryString);
}

export function searchBookmarks(page: number, query: string) {
  let queryString = "?page="+page;
  if(query !== "") {
    queryString+="&query="+query;
  }
  return axios.get<BookmarkListModel>(`/api/bookmarks/search`+queryString);
}

export function fetchBookmarksByTag(page: number, tag: string) {
  return axios.get<BookmarkListModel>(`/api/tags/${tag}?page=${page}`);
}

export function fetchAllTags() {
  return axios.get<Array<TagModel>>(`/api/tags`);
}

export function login(credentials: LoginRequest) {
  return axios.post<LoginResponse>(`/api/auth/login`, credentials);
}

export function createUser(user: CreateUserRequest) {
  return axios.post<CreateUserResponse>(`/api/users`, user);
}
