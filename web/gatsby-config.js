require('dotenv').config()

module.exports = {
  siteMetadata: {
    facebookAppId: 'a3475893asda',
    locale: 'nb_NO',
    siteName: 'Heydays starter',
    siteUrl: 'https://heydays-starter.netlify.com'
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET_PROD,
        // a token with read permissions is required
        // if you have a private dataset
        token:
          process.env.NODE_ENV === 'development'
            ? process.env.SANITY_TOKEN
            : '',
        watchMode: process.env.NODE_ENV === 'development',
        overlayDrafts: process.env.NODE_ENV === 'development'
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-next-seo`,
    `gatsby-plugin-portal`,
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      // Available options: https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin
      options: {
        openAnalyzer: false,
        analyzerPort: 5000,
        production: true
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /icons\/.*\.svg/
        }
      }
    },
    {
      resolve: '@danbruegge/gatsby-plugin-stylelint',
      options: { files: ['**/*.{js,jsx}'] }
    },
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [
          `fetch`,
          'Array.prototype.forEach',
          'NodeList.prototype.forEach',
          'Array.prototype.map'
        ]
      }
    },
    {
      // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sitemap
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // exclude preview page from sitemap
        exclude: [`/_preview/*`]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: `https://kilter.com`,
        sitemap: `https://kilter.com/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GOOGLE_TAGMANAGER_ID,

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `${__dirname}/src/assets/images/favicon.png`,
        name: 'Kilter',
        short_name: 'Kilter',
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#fff`,
        display: 'Kilter'
      }
    }
  ]
}
