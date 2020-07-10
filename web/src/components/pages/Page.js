import React from 'react'
import styled, { css } from 'styled-components'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import {
  Animate,
  Container,
  Grid,
  GridItem,
  H1,
  P,
  Spacer,
  Stagger
} from '../elements'
import { spacing } from '../../styles/utilities'
import CloudinaryImage from '../elements/CloudinaryImage'
import Editor from '../editor'

const Page = ({
  className,
  title,
  subtitle,
  _rawEditorMinimal,
  pagebuilder,
  mainImage,
  ...props
}) => {
  return (
    <div className={className}>
      <Container className="Page__container">
        {(mainImage || title || subtitle || _rawEditorMinimal) && (
          <header className="Page__header">
            {mainImage && (
              <Grid>
                <GridItem offset={{ xs: 0, md: 2 }} span={{ xs: 12, md: 10 }}>
                  <Animate>
                    <CloudinaryImage node={mainImage} />
                  </Animate>
                </GridItem>
              </Grid>
            )}
            <Spacer size="lg" />
            <Grid>
              <GridItem span={{ xs: 12, md: 8 }}>
                <Stagger>
                  {title && <H1>{title}</H1>}
                  {subtitle && <P modifiers="small">{subtitle}</P>}
                  {_rawEditorMinimal && <Editor blocks={_rawEditorMinimal} />}
                </Stagger>
              </GridItem>
            </Grid>
          </header>
        )}
        {pagebuilder && (
          <div className="Page__content">
            {pagebuilder?.sections && (
              <Pagebuilder sections={pagebuilder.sections} />
            )}
          </div>
        )}
      </Container>
    </div>
  )
}

export default styled(Page)(
  ({ theme }) => css`
    .Page__header {
      ${spacing.section('mb')}
    }
    .Page__content {
      ${spacing.sm('mt')}
    }
  `
)
