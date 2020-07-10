import React from 'react'

import Editor from '../editor/'
import { CloudinaryMediaResolver } from '../resolvers'
import { H3, P, Grid, GridItem, Stagger, Animate } from '../elements'
import styled, { css } from 'styled-components'
import { spacing } from '../../styles/utilities'

const TextImageSplit = props => {
  const {
    textOnTheRight = false,
    image,
    aspect,
    title,
    subtitle,
    content,
    className,
    vertical
  } = props
  if (!image && !title) return null
  if (vertical) return <TextImageSplitVertical {...props} />
  return (
    <div className={className}>
      <Grid
        direction={textOnTheRight && 'row-reverse'}
        gap={true}
        align="center"
      >
        <GridItem span={{ xs: 12, md: 6 }}>
          <Stagger>
            {title && <H3>{title}</H3>}
            {subtitle && (
              <P className="TextImageSplit__subtitle label">{subtitle}</P>
            )}
            {content && (
              <Editor className="TextImageSplit__content" blocks={content} />
            )}
          </Stagger>
        </GridItem>
        <GridItem span={{ xs: 12, md: 6 }}>
          <Animate>
            <CloudinaryMediaResolver node={image} aspect={aspect} />
          </Animate>
        </GridItem>
      </Grid>
    </div>
  )
}

const TextImageSplitVertical = ({
  textOnTheRight = false,
  image,
  aspect,
  title,
  subtitle,
  content,
  vertical
}) => {
  return (
    <Grid gap={true} direction={textOnTheRight && 'column-reverse'}>
      <GridItem offset={{ xs: 0, md: 2 }} span={{ xs: 12, md: 8 }}>
        <Stagger className="content">
          {title && <H3>{title}</H3>}
          {subtitle && (
            <P className="TextImageSplit__subtitle label">{subtitle}</P>
          )}
          {content && (
            <Editor className="TextImageSplit__content" blocks={content} />
          )}
        </Stagger>
      </GridItem>
      <GridItem span={{ xs: 12, md: 8 }}>
        <Animate>
          <CloudinaryMediaResolver node={image} aspect={aspect} />
        </Animate>
      </GridItem>
    </Grid>
  )
}

export default styled(TextImageSplit)(
  ({ theme }) => css`
    .TextImageSplit {
      &__content {
        ${spacing.sm('mt')}
      }
      &__subtitle {
        ${spacing.sm('mt')}
      }
    }
  `
)
