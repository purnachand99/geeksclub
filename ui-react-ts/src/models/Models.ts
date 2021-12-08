
export interface TagModel {
  id: number
  name: string
}

export interface BookmarkListModel {
  data: BookmarkModel[],
  pageNumber: number
  totalPages: number
  hasPrevious: boolean
  hasNext: boolean,
  basePath?: string
}

export interface BookmarkModel {
  id: number
  url: string
  title: string
  tags: string[]
}

export interface CreateBookmarkRequest {
  url: string
  title: string
  tags: string[]
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  expires_at: number
  user: {
    name: string
    email: string
    role: string
  }
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export interface CreateUserResponse {
  id: number
  name: string
  email: string
  role: string
}

