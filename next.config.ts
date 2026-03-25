import type { NextConfig } from 'next'

class VeliteWebpackPlugin {
  static started = false
  apply(compiler: {
    options: { mode: string }
    hooks: { beforeCompile: { tapPromise: (name: string, fn: () => Promise<void>) => void } }
  }) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const { build } = await import('velite')
      await build({ watch: compiler.options.mode === 'development', clean: false })
    })
  }
}

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  outputFileTracingRoot: __dirname,
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
}

export default nextConfig
