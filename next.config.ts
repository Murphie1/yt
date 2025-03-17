/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "oaidalleapiprodscus.blob.core.windows.net",
            },
            {
                protocol: "https",
                hostname: "utfs.io",
            },
            {
                protocol: "https",
                hostname: "ucarecdn.com",
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "lovely-flamingo-139.convex.cloud",
            },
            {
                protocol: "https",
                hostname: "combative-meerkat-957.convex.cloud",
            },
        ],
        domains: [
            "uploadthing.com",
            "res.cloudinary.com",
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
        ],
    },
}

export default nextConfig
{/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.mux.com",
      },
      {
        protocol: "https",
        hostname: "4pd1ymepzs.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
*/}
