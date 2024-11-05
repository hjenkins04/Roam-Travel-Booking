/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  output: "standalone",
  
  async rewrites() {
    const isDevelopment = process.env.NODE_ENV === 'development';

    return [
      {
        source: '/api/:path*',
        destination: isDevelopment 
          ? 'http://127.0.0.1:5000/api/:path*' // Development URL
          : 'http://backend:5000/api/:path*', // Production URL
      },
    ];
  },
};

export default nextConfig;
