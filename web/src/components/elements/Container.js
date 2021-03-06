import React from 'react'
import styled, { css } from 'styled-components'
import { spacing } from '../../styles/utilities'

const Container = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

export default styled(Container)(
  ({ theme }) => css`
    width: 100%;
    max-width: 1800px;
    margin: 0 auto;
    ${spacing.container('px')}
  `
)
