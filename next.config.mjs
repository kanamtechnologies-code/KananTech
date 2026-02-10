/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Prevent corrupted dev output when the FS cache gets out of sync.
      // This repo has large media files; combined with watcher limits it can cause missing chunks/CSS.
      config.cache = false;

      // Reduce watch pressure (helps avoid EMFILE and partial builds).
      config.watchOptions = {
        ...(config.watchOptions ?? {}),
        ignored: [
          "**/.next/**",
          "**/node_modules/**",
          "**/public/videos/**",
          "**/.git/**",
        ],
      };
    }
    return config;
  },
};

export default nextConfig;

