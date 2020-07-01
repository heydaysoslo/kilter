/**
 * https://www.sanity.io/docs/content-studio/dashboard
 * Insta
 * https://www.sanity.io/docs/dashboard/installing-and-configuring-widgets
 */
export default {
  widgets: [
    { name: 'structure-menu' },

    {
      name: 'netlify',
      options: {
        sites: [
          {
            buildHookId: '5efcb3a900a5224899746c7e', // Create this under Build & deploy look for Build hooks
            title: 'Website', // Title that appears in the dashboard
            name: 'kilter', // Find on netlify under General>Site details look for Site name
            apiId: '9c155115-c2db-4bfd-8b20-56d9978fee0a' // Find on netlify under General>Site details look for APP ID
          }
        ]
      }
    },
    {
      name: 'document-list',
      options: {
        title: 'Recent articles',
        order: '_createdAt desc',
        types: ['article']
      },
      layout: { width: 'medium' }
    },
    { name: 'project-users', layout: { height: 'auto', width: 'auto' } },
    {
      name: 'project-info',
      layout: {
        width: 'auto',
        height: 'auto'
      }
    }
  ]
}
