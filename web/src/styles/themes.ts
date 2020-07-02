import { css, DefaultTheme } from 'styled-components'

import { remSize } from './utilities/Converters'
import { BorderProps } from '../types'

const baseColors = {
  brown: '#B58967',
  textBrown: '#715B49',
  textGrey: '#959595',
  white: '#fff',
  black: '#000'
}

export const colors = {
  ...baseColors,
  primary: baseColors.brown,
  secondary: baseColors.black,
  interactive: baseColors.brown,
  text: baseColors.black,
  border: baseColors.black,
  background: baseColors.white
}

export const breakpoints = {
  xs: 0,
  sm: 550,
  md: 870,
  lg: 1200,
  xl: 1600,
  xxl: 1800
}

export const spacingUnit = {
  xs: remSize(5),
  sm: remSize(10),
  md: remSize(20),
  lg: remSize(40),
  xl: remSize(80),
  section: remSize(180),
  gutter: remSize(24)
}

export const responsiveSpacing = {
  xs: {
    xs: remSize(5),
    lg: remSize(10)
  },
  sm: {
    xs: 'sm',
    lg: 'sm'
  },
  md: {
    xs: 'md',
    lg: 'md'
  },
  lg: {
    xs: 'lg',
    lg: 'lg'
  },
  section: {
    xs: 'section'
  },
  gutter: {
    xs: 'gutter',
    lg: 'gutter'
  },
  container: {
    xs: '10px',
    md: 'lg',
    lg: '5vw'
  },
  pixel: {
    xs: '1px'
  }
}

export const grid = {
  columns: 12
}

export const fontFamily = {
  sans: `'SuisseIntl', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;`
}

export const responsiveFonts = {
  small: '14px/1.4',
  body: '18px/1.5',
  h1: {
    xs: '42px/1.4'
  },
  h2: {
    xs: '26px/1.4'
  },
  h3: {
    xs: '26px/1.4'
  }
}

export const aspect = {
  portrait: 7 / 6,
  landscape: 2 / 3,
  square: 1,
  widescreen: 9 / 16,
  panorama: 11 / 16
}

export const contentWidth = {
  small: remSize(600),
  large: remSize(1200)
}

export const icons = {
  small: remSize(40),
  medium: remSize(80),
  large: remSize(160)
}

export const trans = {
  fast: `0.1s ease`,
  slow: `1s ease`
}

export const borderWidth = {
  small: remSize(1),
  large: remSize(3)
}

export const border = {
  large: (prop: BorderProps) => ({ theme }: { theme: DefaultTheme }) => css`
    ${prop}: ${theme.borderWidth.large} solid ${theme.colors.border};
  `,
  small: (prop: BorderProps) => ({ theme }: { theme: DefaultTheme }) => css`
    ${prop}: ${theme.borderWidth.small} solid ${theme.colors.border};
  `
}

export const theme: DefaultTheme = {
  colors,
  breakpoints,
  spacingUnit,
  grid,
  fontFamily,
  aspect,
  responsiveFonts,
  contentWidth,
  trans,
  icons,
  borderWidth,
  border
}

export const darkTheme = {
  ...theme,
  colors: {
    primary: 'green',
    secondary: 'orange',
    text: 'white',
    border: 'red',
    background: '#b2b2b2'
  },
  grid: {
    columns: 24
  },
  spacingUnit: {
    xs: remSize(15),
    sm: remSize(110),
    md: remSize(115),
    lg: remSize(140),
    xl: remSize(180),
    section: remSize(1160),
    gutter: remSize(30)
  },
  breakpoints: {
    xs: 0,
    sm: 200,
    md: 400,
    lg: 600,
    xl: 800,
    xxl: 900
  },
  defaultStyle: ({ theme }) => css`
    html {
      font-size: 75%;
    }
    body {
      background: ${theme?.colors?.background};
    }
  `
}

export default theme
