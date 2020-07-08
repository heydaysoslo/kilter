import React from 'react'
import loadable from '@loadable/component'
import { motion } from 'framer-motion'

import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/themes'
import { GlobalStyle } from '../styles/utilities/Global'
import { easings } from '../utils/animation'

const GridToggler = loadable(() => import('./elements/GridToggler'))

const Layout = ({ page, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="Site">
        <SEO page={page} />
        <Header />
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={easings.default}
          className="Site__content"
        >
          {children}
        </motion.div>
        <Footer />
        <GlobalStyle />
        {process.env.NODE_ENV === 'development' && <GridToggler />}
      </div>
    </ThemeProvider>
  )
}

export default Layout
