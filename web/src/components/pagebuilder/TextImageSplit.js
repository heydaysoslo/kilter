import React from 'react'
import { motion } from 'framer-motion'

import Editor from '../editor/'
import { CloudinaryMediaResolver } from '../resolvers'
import { H3, Grid, GridItem } from '../elements'
import styled, { css } from 'styled-components'
import { spacing } from '../../styles/utilities'
import { transitions } from '../../utils/animation'

const TextImageSplit = ({
  textOnTheRight = false,
  image,
  aspect,
  title,
  subtitle,
  content,
  className
}) => {
  if (!image && !title) return null
  return (
    <div className={className}>
      <Grid
        reverse={textOnTheRight}
        columns={{ xs: 1, md: 2 }}
        gap={true}
        align="center"
      >
        <GridItem span={{ xs: 12, md: 6 }}>
          <motion.div
            className="content"
            variants={transitions.stagger}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            {title && (
              <H3 as={motion.h3} variants={transitions.fadeInUp}>
                {title}
              </H3>
            )}
            {subtitle && (
              <motion.p
                variants={transitions.fadeInUp}
                className="TextImageSplit__subtitle"
              >
                {subtitle}
              </motion.p>
            )}
            {content && (
              <motion.div variants={transitions.fadeInUp}>
                <Editor className="TextImageSplit__content" blocks={content} />
              </motion.div>
            )}
          </motion.div>
        </GridItem>
        <GridItem span={{ xs: 12, md: 6 }}>
          <motion.div
            className="image"
            whileHover={{ scale: 1.1 }}
            {...transitions.fadeIn}
          >
            <CloudinaryMediaResolver node={image} aspect={aspect} />
          </motion.div>
        </GridItem>
      </Grid>
    </div>
  )
}

export default styled(TextImageSplit)(
  ({ theme }) => css`
    .TextImageSplit {
      &__content {
        ${spacing.sm('mt')}
      }
      &__subtitle {
        color: ${theme.colors.textGrey};
        ${spacing.sm('mt')}
      }
    }
  `
)
