import React from 'react'
import CloudinaryVideo from '../elements/CloudinaryVideo'
import CloudinaryImage from '../elements/CloudinaryImage'

const CloudinaryMediaResolver = ({ node, aspectRatio }) => {
  const isNested = node.hasOwnProperty('image')
  if (
    node?.image?.resource_type === 'image' ||
    node?.resource_type === 'image'
  ) {
    return <CloudinaryImage node={node} aspectRatio={aspectRatio} />
  } else if (
    node?.image?.resource_type === 'video' ||
    node?.resource_type === 'video'
  ) {
    return <CloudinaryVideo node={isNested ? node?.image : node} />
  }
  return null
}

export default CloudinaryMediaResolver
