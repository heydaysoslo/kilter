import d from '../defaults'

export default {
  name: 'textImageSplit',
  title: 'Text Image Split',
  type: 'object',
  fieldsets: [
    { name: 'image', title: 'Image' },
    { name: 'content', title: 'Content' },
    { name: 'options', title: 'Options' }
  ],
  fields: [
    {
      name: 'textOnTheRight',
      title: 'Image first',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      name: 'vertical',
      title: 'Stack vertically',
      type: 'boolean',
      fieldset: 'options'
    },
    {
      ...d.title,
      fieldset: 'content'
    },
    {
      ...d.subtitle,
      fieldset: 'content'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'editorMinimal',
      fieldset: 'content'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'cloudinarySingleVideo',
      fieldset: 'image'
    },
    {
      name: 'aspect',
      title: 'Aspect Ratio',
      type: 'aspect',
      fieldset: 'image'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    },
    prepare({ media, title }) {
      return {
        title,
        media: media || '',
        subtitle: 'Text Image Split'
      }
    }
  }
}

// export default {
//   name: 'textImageSplit',
//   title: 'Text Image Split',
//   type: 'object',
//   fieldsets: [{ name: 'image', title: 'Image' }],
//   fields: [
//     // {
//     //   name: 'textOnTheRight',
//     //   title: 'Text On The Right',
//     //   type: 'boolean'
//     // },
//     {
//       name: 'title',
//       title: 'title',
//       type: 'string'
//     }
//     // {
//     //   name: 'text',
//     //   title: 'Text',
//     //   type: 'editorMinimal'
//     // },
//     // {
//     //   name: 'image',
//     //   title: 'Image',
//     //   type: 'mainImage',
//     //   fieldset: 'image'
//     // },
//     // {
//     //   name: 'aspect',
//     //   title: 'Aspect Ratio',
//     //   type: 'aspect',
//     //   fieldset: 'image'
//     // }
//   ],
//   preview: {
//     select: {
//       title: 'title',
//       media: 'image'
//     },
//     prepare({ media, title }) {
//       return {
//         title,
//         media: media || '',
//         subtitle: 'Text Image Split'
//       }
//     }
//   }
// }
