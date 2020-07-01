import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

const Hamburger = ({ className, color = 'black', open = false }) => {
  const horVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  }
  const verVariants = {
    closed: { rotate: 0 },
    open: { rotate: -90 }
  }
  return (
    <div className={className}>
      <svg className="icon" viewBox="0 0 10 10">
        <motion.line
          variants={verVariants}
          animate={open ? 'open' : 'closed'}
          className="ver"
          stroke={color}
          x1="5"
          y1="0"
          x2="5"
          y2="10"
        />
        <motion.line
          variants={horVariants}
          animate={open ? 'open' : 'closed'}
          className="hor"
          stroke={color}
          x1="0"
          y1="5"
          x2="10"
          y2="5"
        />
      </svg>
    </div>
  )
}

export default styled(Hamburger)(
  ({ theme }) => css`
    position: relative;
    width: ${theme.icons.small};
    height: ${theme.icons.small};
  `
)
