import React from 'react'
import styled, { css } from 'styled-components'
import { graphql } from 'gatsby'
import { aspect } from '../../styles/themes'

/*
Image transformations:
https://cloudinary.com/documentation/image_transformation_reference
*/

const getAspect = ratio => {
  if (typeof ratio === 'string' && aspect[ratio]) {
    return aspect[ratio]
  } else if (typeof ratio === 'number') {
    return ratio
  }
}

const getImageSrc = ({ public_id, format }, aspectRatio) => {
  let transformations = 'f_auto,q_auto'
  if (aspectRatio) {
    transformations += `,ar_${getAspect(aspectRatio)},c_fill`
  }

  // Applying transformations to animated gifs is extremely unstable
  // quick fix to prevent issues
  if (format === 'gif') {
    return {
      empty: `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`,
      lqip: `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`,
      srcset: `https://res.cloudinary.com/handsomefrank/image/upload/${public_id}.${format}`,
      noscript: `https://res.cloudinary.com/handsomefrank/image/upload/${public_id}.${format}`
    }
  }

  return {
    empty: `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`,
    lqip: `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`,
    // lqip: `https://res.cloudinary.com/handsomefrank/image/upload/w_1,f_auto${
    //   aspectRatio ? `,ar_${getAspect(aspectRatio)},c_fill` : ''
    // }/${public_id}`,
    srcset: `
      https://res.cloudinary.com/handsomefrank/image/upload/${transformations},w_256/${public_id} 256w,
      https://res.cloudinary.com/handsomefrank/image/upload/${transformations},w_512/${public_id} 512w,
      https://res.cloudinary.com/handsomefrank/image/upload/${transformations},w_768/${public_id} 768w,
      https://res.cloudinary.com/handsomefrank/image/upload/${transformations},w_1024/${public_id} 1024w,
      https://res.cloudinary.com/handsomefrank/image/upload/${transformations},w_1280/${public_id} 1280w
    `,
    noscript: `https://res.cloudinary.com/handsomefrank/image/upload/${transformations},w_1280/${public_id}`
  }
}

const CloudinaryImage = ({ node, className, aspectRatio = null }) => {
  // console.log('CloudinaryImage -> node', node.image)
  if (!node) {
    return null
  }
  // Set aspect ratio as style prop to prevent generating a class for every ratio
  const originalRatio =
    node?.aspectRatio || node?.image?.aspectRatio || node?.aspect_ratio || null
  const passedRatio = aspectRatio && getAspect(aspectRatio)
  // Get the passed ratio first, then fallback to image original ratio
  const ratioValue = passedRatio || originalRatio
  const src = getImageSrc(node?.image ? node.image : node, ratioValue)
  const ratioStyle = ratioValue
    ? { paddingBottom: `${100 / ratioValue}%` }
    : null
  return (
    <div className={className}>
      <div className="spacer" style={ratioStyle} />
      {/* <img src={src.lqip} aria-hidden="true" alt={node.alt} /> */}
      <img
        className="lazyload"
        alt={node.alt}
        src={src.empty}
        data-sizes="auto"
        data-srcset={src.srcset}
      />
      <noscript>
        <img src={src.noscript} alt={node.alt} />
      </noscript>
    </div>
  )
}

export default styled(CloudinaryImage)(
  ({ theme }) => css`
    width: 100%;
    position: relative;
    overflow: hidden;
    /* backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0, 0, 0), translateZ(0); */

    .spacer {
      display: block;
      width: 100%;
      background: rgba(125, 125, 125, 0.05);
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: opacity 500ms, transform 500ms;
      &.lazyload,
      &.lazyloading {
        opacity: 0;
        /* filter: blur(50px); */
        /* Blurring is causing massive lag on all animations and loading across the site */
      }
      &.lazyloaded {
        opacity: 1;
        /* filter: blur(0px); */
        /* Blurring is causing massive lag on all animations and loading across the site */
      }
    }
  `
)

export const query = graphql`
  fragment CloudinaryImage on SanityCloudinarySingleImage {
    _key
    aspectRatio
    width
    height
    format
    public_id
    resource_type
  }

  fragment MainImage on SanityMainImage {
    alt
    _key
    cldimage {
      ...CloudinaryImage
    }
  }
`
