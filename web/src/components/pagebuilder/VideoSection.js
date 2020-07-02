/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import styled, { css } from 'styled-components'
import CloudinaryVideo from '../elements/CloudinaryVideo'

const VideoSection = ({ className, video }) => {
  return (
    <div className={className + ' PageBuilder__item'}>
      <CloudinaryVideo
        node={video}
        options={{ blur: false, autoPlay: false }}
      />
    </div>
  )
}

export default styled(VideoSection)(
  ({ theme }) => css`
    video {
      max-width: 100%;
      width: 100%;
    }
  `
)
