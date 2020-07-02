import MdMovie from 'react-icons/lib/md/movie'

export default {
  name: 'videoSection',
  title: 'Video Section',
  type: 'object',
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'cloudinarySingleVideo'
    }
  ],
  preview: {
    select: {
      title: 'video.public_id'
    },
    prepare({ title }) {
      return {
        title,
        media: MdMovie,
        subtitle: 'Video section'
      }
    }
  }
}
