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
import { Stagger } from '../elements'

const CarouselSection = loadable(() => import('./CarouselSection'))

const sectionTypes = {
  section: Section,
  cardSection: CardSection,
  textSection: TextSection,
  imageSection: FullImageSection,
  textImageSplit: TextImageSplit,
  carousel: CarouselSection,
  tabs: Tabs,
  videoSection: VideoSection,
  moduleReference: props => {
    if (props?.globalModule?.pagebuilder?.sections) {
      // Don't allow nested module references
      const sections = props.globalModule.pagebuilder.sections.filter(
        section => section._type !== 'moduleReference'
      )
      if (sections.length) {
        return <PageBuilder sections={sections} />
      }
      return null
    }
    return null
  }
}

const StyledPageBuilder = styled(motion.div)`
  .PageBuilder__item:not(:first-child) {
    ${spacing.section('mt')};
  }
`

const PageBuilder = ({ sections }) => {
  return (
    <StyledPageBuilder>
      <Stagger childrenClassName="PageBuilder__item">
        {sections.map((section, index) => {
          const Component = sectionTypes[section._type] || null
          return Component ? (
            <Component
              {...section}
              prevComp={sections[index - 1] ? sections[index - 1] : null}
              nextComp={sections[index + 1] ? sections[index + 1] : null}
            />
          ) : (
            <p key={section._key} style={{ background: 'yellow' }}>
              Component {section._type} not found
            </p>
          )
        })}
      </Stagger>
    </StyledPageBuilder>
  )
}

export default PageBuilder
