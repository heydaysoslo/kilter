import React from 'react'
import styled, { css } from 'styled-components'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import { Container } from '../elements'
import { spacing } from '../../styles/utilities'

const Page = ({ className, title, content, pagebuilder, ...props }) => {
  return (
    <div className={className}>
      <Container className="Page__container">
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
      ${spacing.sm('mt')}
    }
    .Page__content {
      ${spacing.sm('mt')}
    }
  `
)
