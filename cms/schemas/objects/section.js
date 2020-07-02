import d from '../defaults'

export default {
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [d.subtitle, d.editorMinimal],
  preview: {
    select: {
      title: 'subtitle'
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Section'
      }
    }
  }
}
