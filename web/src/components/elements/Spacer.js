import React from 'react'
import styled, { css } from 'styled-components'
import { spacing } from '../../styles/utilities'

const Spacer = ({ className }) => {
  return <div className={className}></div>
}

export default styled(Spacer)(
  ({ theme, size }) => css`
    ${spacing[size]('mt')}
  `
)
