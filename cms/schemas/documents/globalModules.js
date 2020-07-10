import FaGlobe from 'react-icons/lib/fa/globe'
import d from '../defaults'

export default {
  name: 'globalModule',
  title: 'Global modules',
  type: 'document',
  icon: FaGlobe,
  fields: [
    {
      ...d.title,
      validation: Rule => Rule.required()
    },
    {
      title: 'Modules',
      type: 'pagebuilder',
      name: 'pagebuilder',
      description:
        'You can add as many sections as you want to build a global layout and use across as many pages as you want. (Note that adding a "Global module" to this section will not render anything in the front end.)'
    }
  ]
}
