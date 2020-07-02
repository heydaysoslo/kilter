import React from 'react'
import styled, { css } from 'styled-components'
import CloudinaryImage from '../elements/CloudinaryImage'

const Figure = ({ node, aspectRatio, className }) => {
  if (!node || !node.asset) {
    return null
  }
  return (
    <figure className={className}>
      <CloudinaryImage
        key={node.asset?.id}
        node={node}
        aspectRatio={aspectRatio}
      />
      {node.caption && (
        <figcaption className="Figure__caption">{node.caption}</figcaption>
      )}
    </figure>
  )
}

export default styled(Figure)(
  ({ theme }) => css`
    width: 100%;
    max-width: 100%;
  `
)
