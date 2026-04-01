const blogRedirects = require('./scripts/blog-redirects.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'dynameet.ai',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/demo',
        destination: '/',
        permanent: true,
      },
      {
        source: '/demo/',
        destination: '/',
        permanent: true,
      },
      ...blogRedirects,
      {
        source: '/features/chatbot',
        destination: '/features/engage/',
        permanent: true,
      },
      {
        source: '/features/chatbot/',
        destination: '/features/engage/',
        permanent: true,
      },
      {
        source: '/features/onsite',
        destination: '/features/nurture/',
        permanent: true,
      },
      {
        source: '/features/onsite/',
        destination: '/features/nurture/',
        permanent: true,
      },
      {
        source: '/features/offsite',
        destination: '/features/convert/',
        permanent: true,
      },
      {
        source: '/features/offsite/',
        destination: '/features/convert/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
