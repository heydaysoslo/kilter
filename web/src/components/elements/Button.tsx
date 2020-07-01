import React from 'react'
import { applyStyleModifiers } from 'styled-components-modifiers'
import styled, { css } from 'styled-components'
import { fonts } from '../../styles/utilities'

type Modifiers = 'secondary' | 'small'

type Props = {
  children: React.ReactNode
  className?: string
  modifiers?: Modifiers | Modifiers[]
  onClick?: () => void
}

const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={className}
      onMouseDown={e => e.preventDefault}
      {...props}
    >
      {children}
    </button>
  )
}

const BUTTON_MODIFIERS = {
  secondary: () => css`
    background: orange;
    border-color: orange;

    &:hover {
      background-color: none;
      color: orange;
    }
  `,
  small: () => css`
    padding: 10px;
  `
}

export default styled(Button)(
  ({ theme }) => css`
    appearance: none;
    background: none;
    display: inline-block;
    border: 1px solid ${theme.colors.interactive};
    color: ${theme.colors.interactive};
    font-size: ${fonts.body()};
    padding: 7px 20px;
    transition: 0.15s ease background-color, color;
    border-radius: 999px;

    &:hover {
      background-color: ${theme.colors.interactive};
      color: white;
    }

    ${applyStyleModifiers(BUTTON_MODIFIERS)}
  `
)
