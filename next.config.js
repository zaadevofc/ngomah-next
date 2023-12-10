/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/_',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
