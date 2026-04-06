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
      // Old phase URLs → new product URLs
      {
        source: '/features/detect',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/detect/',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/engage',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/engage/',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/nurture',
        destination: '/features/offers/',
        permanent: true,
      },
      {
        source: '/features/nurture/',
        destination: '/features/offers/',
        permanent: true,
      },
      {
        source: '/features/convert',
        destination: '/features/meetings/',
        permanent: true,
      },
      {
        source: '/features/convert/',
        destination: '/features/meetings/',
        permanent: true,
      },
      // Legacy URLs → new product URLs
      {
        source: '/features/chatbot',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/chatbot/',
        destination: '/features/ai-chat/',
        permanent: true,
      },
      {
        source: '/features/onsite',
        destination: '/features/offers/',
        permanent: true,
      },
      {
        source: '/features/onsite/',
        destination: '/features/offers/',
        permanent: true,
      },
      {
        source: '/features/offsite',
        destination: '/features/meetings/',
        permanent: true,
      },
      {
        source: '/features/offsite/',
        destination: '/features/meetings/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
