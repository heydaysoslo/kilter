import React from 'react'
import styled, { css } from 'styled-components'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import { Container } from '../elements'
import { spacing } from '../../styles/utilities'

const FrontPage = ({ className, _rawPagebuilder }) => {
  return (
    <div className={className}>
      <Container className="Page__container">
        {_rawPagebuilder && (
          <div className="Page__content">
            {_rawPagebuilder?.sections && (
              <Pagebuilder sections={_rawPagebuilder.sections} />
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
