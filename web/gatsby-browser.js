/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import 'intersection-observer'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'

import { AppProvider } from './src/components/context/AppContext'

import './src/styles/reset.css'
import './src/assets/fonts/fonts.css'

import 'lazysizes/plugins/respimg/ls.respimg.js'
import 'lazysizes/plugins/attrchange/ls.attrchange.js'
import 'lazysizes'

export const wrapRootElement = ({ element }) => (
  <AppProvider>{element}</AppProvider>
)

let scrollY = 0

export const onPreRouteUpdate = () => {
  scrollY = window.scrollY
}

export const onRouteUpdate = () => {
  window.scroll(0, scrollY)
}

export const wrapPageElement = data => {
  const { element, props } = data
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <AnimateSharedLayout type="crossfade">
      <AnimatePresence
        exitBeforeEnter
        // onExitComplete={props => {
        //   window.scroll(0, 600)
        // }}
      >
        <motion.div key={props.path}>{element}</motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}
