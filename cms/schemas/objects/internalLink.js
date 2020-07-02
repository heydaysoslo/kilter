// import Link from 'react-icons/lib/io/link'
// Follow sanity recommendations for internal/external links
// https://www.sanity.io/guides/portable-text-internal-and-external-links
import React from 'react'
import { defaultLinkFields } from '../defaults/linkDefaults'

import InternalLinkIcon from 'react-icons/lib/md/link'

const InternalLinkRenderer = props => (
  <span>{props.linkText || props.children}</span>
)

export default {
  name: 'internalLink',
  type: 'object',
  title: 'Internal link',
  blockEditor: {
    icon: InternalLinkIcon,
    render: InternalLinkRenderer // this is occasionaly crashing for some weird reason
  },
  fields: [
    {
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [{ type: 'article' }, { type: 'page' }, { type: 'frontpage' }]
    },
    ...defaultLinkFields
  ],
  preview: {
    select: {
      title: 'reference.title',
      linkText: 'linkText'
    },
    prepare({ title, linkText }) {
      return {
        title: linkText || title || 'No link title'
        // media: Link
      }
    }
  }
}
