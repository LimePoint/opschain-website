// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpsChain',
  tagline: 'Unify and orchestrate change across your IT landscape',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://opschain.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          {
            type: 'dropdown',
            label: 'Product',
            position: 'left',
            items: [
              {
                type: 'doc',
                label: 'Features',
                docId: 'product/features/index',
              },
              {
                type: 'doc',
                label: "What's new",
                docId: 'product/whats-new/index',
              },
              {
                type: 'doc',
                label: 'Explore OpsChain',
                docId: 'product/explore-opschain/index',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Resources',
            position: 'left',
            items: [
              {
                label: 'Use cases',
                href: '/docs/use-cases/',
              },
              {
                label: 'Case studies',
                href: '/case-studies',
              },
              {
                label: 'Support',
                href: '/support',
              },
            ],
          },
          {
            label: 'Blog',
            href: '/blog',
          },
          {
            type: 'html',
            position: 'right',
            value: '<a class=get-started-button href=/get-started>Get started</a>',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Getting started', href: 'https://docs.opschain.io/docs/getting-started' },
              { label: 'Documentation', href: 'https://docs.opschain.io' },
              { label: 'OpsChain API', href: 'https://docs.opschain.io/api-docs' },
            ],
          },
          {
            title: 'Company',
            items: [
              { label: 'About us', href: '/about-us' },
              { label: 'Contact us', href: '/contact-us' },
              { label: 'Partners', to: '/partners' },
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
          'Copyright © 2024 <a class=footer__link-item href=https://limepoint.com/>LimePoint</a> Pty Ltd. All rights reserved.',
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
