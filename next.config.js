/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Useful for static exports and Vercel
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Set turbopack root explicitly to avoid workspace root ambiguity
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
