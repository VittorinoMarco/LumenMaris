/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/chi-siamo",
        destination: "/#progetto",
        permanent: true,
      },
      {
        source: "/shop/arcomagno",
        destination: "/profumi/saracenum",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/profumi",
        permanent: true,
      },
      {
        source: "/shop/:slug",
        destination: "/profumi/:slug",
        permanent: true,
      },
    ];
  },
  images: {
    // Keep SVG out of the Image Optimization API (mitigates historical RCE class).
    dangerouslyAllowSVG: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
