import type { NextConfig } from 'next'
import type { WebpackPluginInstance } from 'webpack'

class VeliteWebpackPlugin implements WebpackPluginInstance {
  static started = false
  apply(compiler: import('webpack').Compiler) {
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
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
}

export default nextConfig
