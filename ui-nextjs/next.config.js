module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bookmarks',
        permanent: true,
      },
    ]
  },
}
