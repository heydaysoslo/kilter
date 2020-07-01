import React from 'react'
import styled, { css } from 'styled-components'

console.log(process.env)

/*

Media url format:
https://res.cloudinary.com/<cloud_name>/<resource_type>/<type>/<transformations>/<version>/<public_id>.<format>
Docs: https://cloudinary.com/documentation/image_transformations#delivering_media_assets_using_dynamic_urls


Video transformations:
https://cloudinary.com/documentation/video_transformation_reference


https://res.cloudinary.com/<cloud name>/video/upload/<public ID>.<video format file extension>
"https://res.cloudinary.com/handsomefrank/video/upload/v1590428051/animation/Abbey_Lossing_resolutions_pndo2d.mp4"
*/

const videoFormats = [
  {
    format: 'video/webm',
    ext: 'webm'
  },
  {
    format: 'video/mp4',
    ext: 'mp4'
  },
  {
    format: 'video/ogg',
    ext: 'ogv'
  }
]

const getVideoUrl = ({ type, public_id, blur = true }) => {
  // const dpr = (typeof window !== undefined && window.devicePixelRatio) || 1
  const transformations = `f_auto,q_auto:best${blur ? ',e_blur:2000' : ''}` // `q_auto:best,dpr_${dpr}`
  return videoFormats.map(({ ext, format }) => {
    return {
      type: format,
      ext,
      src: `https://res.cloudinary.com/mikemike/video/${type}/${transformations}/${public_id}`
    }
  })
}

const CloudinaryVideo = ({ node, className }) => {
  console.log('CloudinaryVideo -> node', node)
  const videoUrl = getVideoUrl(node)
  return (
    <video
      className={className}
      width={node.width}
      height={node.height}
      autoPlay
      loop
      muted
      playsInline
    >
      {videoUrl.map(({ src, type }) => {
        return <source key={src} src={src} type={type} />
      })}
      Your browser does not support the video tag :(
    </video>
  )
}

export default styled(CloudinaryVideo)(
  ({ theme }) => css`
    width: 100%;
    height: auto;
  `
)
