const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false

        if (!isServer) {
            config.resolve.fallback = { fs: false };
        }

        return config
    }
  }

module.exports = nextConfig