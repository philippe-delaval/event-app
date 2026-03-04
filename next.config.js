/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["knex"],
  },
};

module.exports = nextConfig;
