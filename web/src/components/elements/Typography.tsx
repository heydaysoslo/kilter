import styled, { css } from 'styled-components'

import { fonts, spacing } from '../../styles/utilities'

type Modifiers = 'lead' | 'small'

type Props = {
  modifiers?: Modifiers | Modifiers[]
}

export const P = styled.p<Props>(
  ({ theme, modifiers }) => css`
    ${fonts.body()}
    ${spacing.sm('mt')};

    ${modifiers &&
      modifiers.includes('grey') &&
      css`
        color: ${theme.colors.textGrey};
      `}

    ${modifiers === 'small' &&
      css`
        ${fonts.body()}
        ${spacing.sm('mt')};
      `}

    ${modifiers === 'lead' &&
      css`
        ${fonts.h1()}
        ${spacing.md('mt')};
      `}
  `
)

export const A = styled.a(
  ({ theme }) => css`
    display: inline-block;
    ${spacing.sm('mt')};
  `
)

export const H1 = styled.h1(
  ({ theme }) => css`
    ${fonts.h1()}
  `
)

export const H2 = styled.h2(
  ({ theme }) => css`
    ${fonts.h2()}
  `
)

export const H3 = styled.h3(
  ({ theme }) => css`
    ${fonts.h2()}
  `
)
