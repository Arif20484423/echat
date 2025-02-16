/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
      instrumentationHook:true,
    },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lpbdnkbvpijcinjhkwjl.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/echat%20public/public/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
