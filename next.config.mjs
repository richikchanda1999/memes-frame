/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
    RANGE: process.env.RANGE
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
      },
    ],
  },
};

export default nextConfig;
