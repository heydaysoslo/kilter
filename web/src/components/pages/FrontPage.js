import React from 'react'
import styled, { css } from 'styled-components'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import { H1, P, Container } from '../elements'
import { spacing } from '../../styles/utilities'

const FrontPage = ({ className, title, content, pagebuilder, ...props }) => {
  return (
    <div className={className}>
      <Container className="Page__container">
        {/* <header className="Page__header">
          <P>FrontPage</P>
          {title && <H1>{title}</H1>}
        </header> */}
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

export default styled(FrontPage)(
  ({ theme }) => css`
    .Page__header {
      ${spacing.sm('mt')}
    }
    .Page__content {
      ${spacing.sm('mt')}
    }
  `
)
