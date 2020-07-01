import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

/**
 * Usage:
 *
 * <InView
 *   className="Card"
 *   activeClassName="Card--is-visible"
 *   onInView={props => console.log(props.inView ? `I'm in view` : `I'm not in view`)}
 *   element="span"
 * >
 *   // Add children
 * </InView>
 *
 * Other resources
 * 📚Package: https://www.npmjs.com/package/react-intersection-observer
 * 🎥 With react-spring:  https://github.com/thebuilder/react-intersection-observer/blob/HEAD/docs/Recipes.md#trigger-animations
 */

const defaultTrans = {
  transition: {
    duration: 1
  }
}
export const transitions = {
  fadeInUp: {
    visible: {
      opacity: 1,
      y: 0,
      ...defaultTrans
    },
    hidden: {
      opacity: 0,
      y: 50,
      ...defaultTrans
    }
  },
  fadeIn: {
    visible: {
      opacity: 1,
      ...defaultTrans
    },
    hidden: {
      opacity: 0,
      ...defaultTrans
    }
  }
}

const AnimateInView = ({
  children,
  threshold = 0.25,
  onInView,
  triggerOnce = true,
  transition = 'fadeInUp',
  ...props
}) => {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold,
    triggerOnce
  })

  useEffect(() => {
    if (onInView && typeof onInView === 'function') {
      onInView({ inView, ref, entry })
    }
  }, [onInView, inView, ref, entry])

  return (
    <motion.div
      variants={transitions[transition]}
      animate={inView ? 'visible' : 'hidden'}
      ref={ref}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default styled(AnimateInView)(({ theme }) => css``)
