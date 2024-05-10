/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 's.gravatar.com' },
      { protocol: 'http', hostname: 'res.cloudinary.com' }
    ]
  },
  output: 'standalone'
};

export default nextConfig;
