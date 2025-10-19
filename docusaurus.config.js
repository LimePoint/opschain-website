// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer')
const lightCodeTheme = themes.github
const darkCodeTheme = themes.dracula

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpsChain',
  tagline: 'Enterprise Operations. Intelligent. Autonomous. Governed.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://opschain.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
          postsPerPage: 'ALL',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-6JPFLV2MP6',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/opschain-nav-logo.png',
      navbar: {
        title: 'OpsChain',
        logo: {
          alt: 'OpsChain',
          src: 'img/opschain-nav-logo.png',
        },
        items: [
          { label: 'Why OpsChain', href: '/why-opschain' },
          {
            type: 'dropdown',
            label: 'Features',
            position: 'left',
            items: [
              {
                type: 'doc',
                label: 'Autonomous Agents',
                docId: 'product/features/autonomous-agents',
              },
              {
                type: 'doc',
                label: 'Governed Intelligence',
                docId: 'product/features/governed-intelligence',
              },
              {
                type: 'doc',
                label: 'Enterprise-Grade Security, Auditability, and Compliance',
                docId: 'product/features/security-auditability-compliance',
              },
              {
                type: 'doc',
                label: 'Unified Workflow and Orchestration',
                docId: 'product/features/unified-workflow-orchestration',
              },
              // {
              //   type: 'doc',
              //   label: 'Real-Time Observability & Self-Healing Operations',
              //   docId: 'product/features/real-time-self-healing',
              // },
              // {
              //   type: 'doc',
              //   label: 'Analytics, Insights & Continuous Improvement',
              //   docId: 'product/features/continuous-improvement',
              // },
            ],
          },
          { label: 'Documentation', href: 'https://docs.opschain.io' },
          // { label: 'Getting Started', href: 'https://docs.opschain.io/docs/category/getting-started' },
          {
            type: 'html',
            position: 'right',
            value: '<a class=contact-us-button href=/book-demo>Book Demo</a>',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Documentation Library', href: 'https://docs.opschain.io' },
              { label: 'Getting started', href: 'https://docs.opschain.io/docs/category/getting-started' },
            ],
          },
          {
            title: 'Company',
            items: [
              { label: 'About us', href: 'https://www.limepoint.com/about-limepoint' },
              { label: 'Contact us', href: 'https://www.limepoint.com/contact' },
            ],
          },
          {
            title: 'Legal',
            items: [
              { label: 'End user licence agreement', to: '/eula' },
              { label: 'Terms of use', to: '/terms-of-use' },
              { label: 'Privacy', to: '/privacy' },
            ],
          },
        ],
        copyright:
          'Copyright © 2025 <a class=footer__link-item href=https://limepoint.com/>LimePoint</a> Pty Ltd. All rights reserved.',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: lightCodeTheme,
      },
      colorMode: {
        disableSwitch: true,
      },
    }),
}

module.exports = config
