const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:8080";

const getBookmarks = async (page) => {
    const res = await fetch(`${BASE_API_URL}/api/bookmarks?page=${page}`)
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

module.exports = {
    getBookmarks,
    getBookmarksByTag,
    getTags,
    createBookmark
}