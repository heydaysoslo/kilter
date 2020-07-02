import React, { useRef, useLayoutEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { nanoid } from 'nanoid'

import { Button } from '.'

const uniqueId = nanoid(10)

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

const getVideoUrl = ({ type, public_id }, options) => {
  // const dpr = (typeof window !== undefined && window.devicePixelRatio) || 1
  const transformations = `f_auto,q_auto:best${
    options.blur ? ',e_blur:2000' : ''
  }` // `q_auto:best,dpr_${dpr}`
  return videoFormats.map(({ ext, format }) => {
    return {
      type: format,
      ext,
      src: `https://res.cloudinary.com/mikemike/video/${type}/${transformations}/${public_id}`
    }
  })
}

const CloudinaryVideo = ({
  node,
  className,
  options = { blur: true, autoPlay: true }
}) => {
  const videoUrl = getVideoUrl(node, options)
  const player = useRef(null)
  const [shouldPlay, setShouldPlay] = useState(false)

  useLayoutEffect(() => {
    if (player?.current && !options.autoPlay) {
      player.current.play()
    }
  }, [shouldPlay])

  return (
    <div className={className}>
      {!options.autoPlay && !shouldPlay && (
        <Button onClick={() => setShouldPlay(true)}>Play</Button>
      )}
      <video
        ref={player}
        width={node.width}
        height={node.height}
        autoPlay={options.autoPlay}
        loop={options.autoPlay}
        muted={options.autoPlay}
        controls={!options.autoPlay && shouldPlay}
        playsInline
      >
        {videoUrl.map(({ src, type }) => {
          return <source key={`${uniqueId}-${src}`} src={src} type={type} />
        })}
        Your browser does not support the video tag :(
      </video>
    </div>
  )
}

export default styled(CloudinaryVideo)(
  ({ theme }) => css`
    position: relative;
    video {
      width: 100%;
      height: auto;
    }

    ${Button} {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      border-radius: 0;
      border-width: 0;
      color: ${theme.colors.white};

      &:hover {
        background: transparent;
        color: ${theme.colors.white};
      }
    }
  `
)
