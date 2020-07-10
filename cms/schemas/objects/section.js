import d from '../defaults'

export default {
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [d.title, d.subtitle, d.editorMinimal],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || subtitle || 'No title',
        subtitle: 'Section'
      }
    }
  }
}
