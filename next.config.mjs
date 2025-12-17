/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This is a wildcard: allows images from ANYWHERE (Unsplash, Cloudinary, etc.)
      },
    ],
  },
};

export default nextConfig;