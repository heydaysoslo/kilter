import React, { Suspense } from 'react'

import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/themes'
import { GlobalStyle } from '../styles/utilities/Global'

const GridToggler = React.lazy(() => import('./elements/GridToggler'))

const Layout = ({ page, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="Site">
        <SEO page={page} />
        <Header />
        <div className="Site__content">{children}</div>
        <Footer />
        <GlobalStyle />
        <Suspense fallback="">
          {process.env.NODE_ENV === 'development' && <GridToggler />}
        </Suspense>
      </div>
    </ThemeProvider>
  )
}

export default Layout
