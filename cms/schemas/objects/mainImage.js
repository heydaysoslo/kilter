export default {
  name: 'mainImage',
  title: 'Main image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'cloudinarySingleImage'
    },
    {
      name: 'alt',
      title: `Alternative text`,
      description: `Describe what's in the image. Important for accesibility and SEO. Read more here https://blog.hubspot.com/marketing/image-alt-text`,
      type: 'string'
    }
    // {
    //   name: 'credits',
    //   title: 'Image credits',
    //   type: 'editorMinimal'
    // }
  ]
}
