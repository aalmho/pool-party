/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hgarommhvwvvrhwvsebz.supabase.co'
      },
    ],
  },
}

module.exports = nextConfig
