import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SwiftPay',
  tagline: 'Experience hassle-free payments with SwiftPay - the secure payment gateway for everyone.',
  favicon: 'img/logo.svg',

  // Set the production url of your site here
  url: 'https://docs.pay.raisa.com.np',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

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
      {
        docs: {
          routeBasePath: '/', 
          sidebarPath: './sidebars.ts',
          sidebarCollapsible: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    '@docusaurus/theme-live-codeblock',
  ],
  
  themeConfig: {
    announcementBar: {
      id: `announcementBar`,
      // content: `⭐️ If you like Docusaurus, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/facebook/docusaurus">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://x.com/docusaurus">X ${TwitterSvg}</a>`,
      content: `🎉️ <b><a target="_blank" href="https://pay.raisa.com.np">SwiftPay v1.0.1</a> is out!</b> 🥳️`,
    },
    liveCodeBlock: {
      /**
       * The position of the live playground, above or under the editor
       * Possible values: "top" | "bottom"
       */
      playgroundPosition: 'bottom',
    },
    prism: {
      additionalLanguages: [
        'java',
        'latex',
        'haskell',
        'matlab',
        'PHp',
        'powershell',
        'bash',
        'diff',
        'json',
        'scss',
        'dart',
        'csharp'
      ],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // Replace with your project's social card
    image: 'img/homepage.jpg',
    navbar: {
      title: 'SwiftPay',
      logo: {
        alt: 'SwiftPay Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'swiftSidebar',
          position: 'left',
          path: 'docs',
          label: 'Docs',
          versions: {
            current: {
              label: '1.x.x',
            },
          },
        },
        {
          label: 'Merchant',
          href: 'https://pay.raisa.com.np/merchant',
          position: 'left',
          className: 'navbar-book-demo',
        },
        {
          type: 'dropdown',
          label: 'Knowledge Base',
          position: 'left',
          items: [
            {
              label: 'About',
              href: 'https://pay.raisa.com.np/page/about',
              className: 'navbar-book-demo',                                                                                            
            },
            {
              label: 'Credit',
              href: 'https://pay.raisa.com.np/page/credit',
              className: 'navbar-book-demo',
            },
            {
              label: 'Privacy',
              href: 'https://pay.raisa.com.np/page/privacy',
              className: 'navbar-book-demo',
            },
            {
              label: 'Terms',
              href: 'https://pay.raisa.com.np/page/terms',
              className: 'navbar-book-demo',
            }
          ],
        },  
        {
          label: 'Sandbox',
          href: 'https://pay.raisa.com.np/sandbox',
          position: 'left',
          className: 'navbar-book-demo',
        },      
        {
          label: 'Login',
          href: 'https://pay.raisa.com.np/login',
          position: 'right',
          className: 'navbar-book-demo',
        },
        {
          label: 'Sign Up',
          href: 'https://pay.raisa.com.np',
          position: 'right',
          className: 'dev-portal-signup dev-portal-link swift-theme',
        },
        {
          type: 'dropdown',
          label: 'Version',
          position: 'right',
          items: [
            {
              type: 'doc',
              label: 'Current (v1.0.0)',
              docId: 'intro',
            },
            {
              type: 'html',
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              href: 'https://pay.raisa.com.np',
              label: 'SwiftPay',
            },
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
          dropdownItemsAfter: [
            {
              type: 'html',
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              href: 'https://pay.raisa.com.np',
              label: 'Help Us Translate',
            },
          ],
        }    
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
