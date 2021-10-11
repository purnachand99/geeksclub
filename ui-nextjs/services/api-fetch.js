const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:8080";

const getBookmarks = async (page) => {
    const res = await fetch(`${BASE_API_URL}/api/bookmarks?page=${page}`)
    return await res.json()
}

const searchBookmarks = async (query, page) => {
  const res = await fetch(`${BASE_API_URL}/api/bookmarks/search?query=${query}&page=${page}`)
  return await res.json()
}

const getBookmarksByTag = async (tagSlug, page) => {
    const res = await fetch(`${BASE_API_URL}/api/tags/${tagSlug}?page=${page}`)
    return await res.json()
}

const getTags = async () => {
    const res = await fetch(`${BASE_API_URL}/api/tags`)
    return await res.json()
}

const createBookmark = async (bookmark) => {
    const res = await fetch(`${BASE_API_URL}/api/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookmark)
    })
    return await res.json()
}

const login = async (credentials) => {
  const res = await fetch(`${BASE_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  return await res.json()
}

const registerUser = async (user) => {
  const res = await fetch(`${BASE_API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  return await res.json()
}

module.exports = {
    getBookmarks,
    searchBookmarks,
    getBookmarksByTag,
    getTags,
    createBookmark,
    login,
    registerUser
}
