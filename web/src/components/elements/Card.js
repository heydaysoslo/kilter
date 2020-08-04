import React from 'react'

import AspectContainer from './AspectContainer'
import { LinkResolver } from '../resolvers'
import Editor from '../editor'
import styled, { css } from 'styled-components'
import { P } from './Typography'
import { spacing } from '../../styles/utilities'
import CloudinaryImage from './CloudinaryImage'
import Animate from './Animate'
import Stagger from './Stagger'

const Card = ({ className, title, image, excerpt, link }) => (
  <div className={className}>
    <LinkResolver link={link}>
      <Animate className="media">
        {image ? (
          <CloudinaryImage node={image} aspectRatio="portrait" />
        ) : (
          <AspectContainer
            aspects={{
              xs: 'widescreen'
            }}
          />
        )}
      </Animate>
      <Stagger>
        {title && (
          <P modifiers="large" className="title">
            {title}
          </P>
        )}
        {excerpt && (
          <div className="excerpt">
            <Editor blocks={excerpt} />
          </div>
        )}
      </Stagger>
    </LinkResolver>
  </div>
)

export default styled(Card)(
  ({ theme }) => css`
    .media {
      background: #f1f1f1;
    }

    .title,
    .excerpt {
      ${spacing.sm('mt')}
    }
  `
)
