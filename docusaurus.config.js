// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CollectiveAccess Documentation',
  tagline: '',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://manual2.collectiveaccess.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'CollectiveAccess', // Usually your GitHub org/user name.
  projectName: 'CollectiveAccessManual', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          path: 'providence',
          routeBasePath: 'providence',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  '',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  '',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pawtucket',
        path: 'pawtucket',
        routeBasePath: 'pawtucket',
        sidebarPath: './sidebars.js',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      //image: 'img/docusaurus-social-card.jpg',
      navbar: {
        //title: 'Documentation',
        logo: {
          alt: 'CollectiveAccess',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
          width: 200,
        },
        items: [
          {to: '/quickstart', label: 'Quickstart', position: 'left'},
          {to: '/contributing', label: 'Contributing', position: 'left'},
          {
            type: 'docSidebar',
            sidebarId: 'docSidebar',
            position: 'left',
            label: 'Providence',
          },
          {
            type: 'docSidebar',
            sidebarId: 'docSidebar',
            position: 'left',
            docsPluginId: 'pawtucket',
            label: 'Pawtucket',
          },
          {
            href: 'https://github.com/collectiveaccess/CollectiveAccessManaual',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Providence',
                to: '/providence',
              },
              {
                label: 'Pawtucket',
                to: '/pawtucket',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Forum',
                href: 'https://support.collectiveaccess.org',
              },
              {
                label: 'Chat',
                href: 'https://app.gitter.im/#/room/#collectiveaccess_support:gitter.im',
              },
              {
                label: 'Web site',
                href: 'https://collectiveaccess.org',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/collectiveaccess',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CollectiveAccess`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
    }),
};

export default config;
