import React from 'react'
import loadable from '@loadable/component'

import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/themes'
import { GlobalStyle } from '../styles/utilities/Global'

const GridToggler = loadable(() => import('./elements/GridToggler'))

const Layout = ({ page, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="Site">
        <SEO page={page} />
        <Header />
        <div className="Site__content">{children}</div>
        <Footer />
        <GlobalStyle />
        {process.env.NODE_ENV === 'development' && <GridToggler />}
      </div>
    </ThemeProvider>
  )
}

export default Layout
