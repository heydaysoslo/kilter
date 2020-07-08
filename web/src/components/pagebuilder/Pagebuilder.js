import React from 'react'
import loadable from '@loadable/component'
import { motion } from 'framer-motion'

import CardSection from './CardSection'
import TextSection from './TextSection'
import FullImageSection from './FullImageSection'
import Section from './Section'
import TextImageSplit from './TextImageSplit'
import VideoSection from './VideoSection'
import Tabs from '../elements/Tabs'
import styled from 'styled-components'
import { spacing } from '../../styles/utilities'
import { transitions } from '../../utils/animation'

const CarouselSection = loadable(() => import('./CarouselSection'))

const sectionTypes = {
  section: Section,
  cardSection: CardSection,
  textSection: TextSection,
  imageSection: FullImageSection,
  textImageSplit: TextImageSplit,
  carousel: CarouselSection,
  tabs: Tabs,
  videoSection: VideoSection
}

const StyledPageBuilder = styled(motion.div)`
  .PageBuilder__item {
    ${spacing.section('mt')};
  }
`

const PageBuilder = ({ sections }) => {
  return (
    <StyledPageBuilder
      variants={transitions.stagger}
      initial="initial"
      animate="animate"
      exit="initial"
    >
      {sections.map((section, index) => {
        const Component = sectionTypes[section._type] || null
        return Component ? (
          <div key={section._key}>
            <motion.div variants={transitions.fadeInUp} exit="initial">
              <Component
                {...section}
                prevComp={sections[index - 1] ? sections[index - 1] : null}
                nextComp={sections[index + 1] ? sections[index + 1] : null}
              />
            </motion.div>
          </div>
        ) : (
          <p key={section._key} style={{ background: 'yellow' }}>
            Component {section._type} not found
          </p>
        )
      })}
    </StyledPageBuilder>
  )
}

export default PageBuilder
