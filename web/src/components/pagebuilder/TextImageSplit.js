import React from 'react'

import Editor from '../editor/'
import { LinkResolver, CloudinaryMediaResolver } from '../resolvers'
import { H3, Grid } from '../elements'
import styled, { css } from 'styled-components'
import { spacing } from '../../styles/utilities'

const TextImageSplit = ({
  textOnTheRight = false,
  image,
  aspect,
  title,
  subtitle,
  content,
  className
}) => {
  console.log('image', image)
  if (!image && !title) return null
  return (
    <div className={className}>
      <Grid
        reverse={textOnTheRight}
        columns={{ xs: 1, md: 2 }}
        gap={true}
        align="center"
      >
        <div className="content">
          {title && <H3>{title}</H3>}
          {subtitle && <p className="TextImageSplit__subtitle">{subtitle}</p>}
          {content && (
            <Editor className="TextImageSplit__content" blocks={content} />
          )}
        </div>
        <div className="image">
          <CloudinaryMediaResolver node={image} aspect={aspect} />
        </div>
      </Grid>
    </div>
  )
}

export default styled(TextImageSplit)(
  ({ theme }) => css`
    .TextImageSplit {
      &__content {
        ${spacing.sm('mt')}
      }
      &__subtitle {
        color: ${theme.colors.textGrey};
        ${spacing.sm('mt')}
      }
    }
  `
)
