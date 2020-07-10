export default {
  name: 'moduleReference',
  title: 'Global module',
  type: 'object',
  fields: [
    {
      name: 'globalModule',
      title: 'Module',
      type: 'reference',
      to: [{ type: 'globalModule' }]
    }
  ],
  preview: {
    select: {
      title: 'globalModule.title'
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Global module'
      }
    }
  }
}
