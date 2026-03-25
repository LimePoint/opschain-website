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

// Validate mandatory environment variables
const requiredEnvVars = ['NEXT_PUBLIC_SF_ORG_ID', 'NEXT_PUBLIC_GTM_ID', 'NEXT_PUBLIC_SITE_URL'] as const
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(
      `Missing required environment variable: ${envVar}. Set it in .env.local or your deployment environment.`
    )
  }
}

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  outputFileTracingRoot: __dirname,
  env: {
    NEXT_PUBLIC_SHOW_DRAFTS: process.env.NEXT_PUBLIC_SHOW_DRAFTS || 'false',
    NEXT_PUBLIC_SHOW_COMPARISON_TABLE: process.env.NEXT_PUBLIC_SHOW_COMPARISON_TABLE || 'false',
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
}

export default nextConfig

console.log('--- OpsChain Website Environment ---')
console.log(`  NEXT_PUBLIC_SF_ORG_ID:             ${process.env.NEXT_PUBLIC_SF_ORG_ID}`)
console.log(`  NEXT_PUBLIC_GTM_ID:                ${process.env.NEXT_PUBLIC_GTM_ID}`)
console.log(`  NEXT_PUBLIC_SITE_URL:              ${process.env.NEXT_PUBLIC_SITE_URL}`)
console.log(`  NEXT_PUBLIC_SHOW_DRAFTS:           ${process.env.NEXT_PUBLIC_SHOW_DRAFTS || 'false (default)'}`)
console.log(
  `  NEXT_PUBLIC_SHOW_COMPARISON_TABLE:  ${process.env.NEXT_PUBLIC_SHOW_COMPARISON_TABLE || 'false (default)'}`
)
console.log('------------------------------------')
