import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import { spacing } from '../styles/utilities'
import { motion } from 'framer-motion'

import { Grid, Container, GridItem } from './elements'
import Newsletter from './Newsletter'
import { LinkResolver } from './resolvers'
import Social from './Social'
import { transitions } from '../utils/animation'

const StyledFooter = styled.footer`
  ${spacing.section('mt,py')};
  border-top: 1px solid #000;
`

const Footer = () => {
  const data = useStaticQuery(query)
  const menu = data?.sanitySiteSettings?.footerMenu?._rawItem
  const privacyPage = data?.sanitySiteSettings?._rawPrivacypage
  return (
    <StyledFooter
      as={motion.footer}
      variants={{
        initial: transitions.fadeInUp.initial,
        animate: {
          ...transitions.fadeInUp.animate,
          transition: transitions.stagger
        }
      }}
      initial="initial"
      animate="animate"
      exit="initial"
    >
      <Container>
        <Grid gap="my" columns={{ sm: 2, md: 4 }}>
          <GridItem span={{ xs: 6, md: 3 }}>
            <motion.ul
              className="Footer__menu"
              variants={transitions.stagger}
              initial="initial"
              animate="animate"
              exit="initial"
            >
              {menu &&
                menu.map(item => (
                  <motion.li
                    className="Footer__menu-item"
                    key={item._key}
                    variants={transitions.fadeInUp}
                  >
                    <LinkResolver link={item}>
                      {item?.title || item?.reference?.title}
                    </LinkResolver>
                  </motion.li>
                ))}
            </motion.ul>
          </GridItem>
          <GridItem span={{ xs: 6, md: 3 }}>
            <motion.div
              variants={transitions.fadeInUp}
              className="Footer__social"
            >
              <Social />
            </motion.div>
          </GridItem>
          <GridItem span={{ xs: 6, md: 3 }}>
            <motion.div
              variants={transitions.fadeInUp}
              className="Footer__privacy"
            >
              {privacyPage && (
                <LinkResolver link={privacyPage}>
                  {privacyPage.title}
                </LinkResolver>
              )}
            </motion.div>
          </GridItem>
          <GridItem span={{ xs: 6, md: 3 }}>
            <motion.div
              variants={transitions.fadeInUp}
              className="Footer__newsletter"
            >
              <Newsletter />
            </motion.div>
          </GridItem>
        </Grid>
      </Container>
    </StyledFooter>
  )
}

export default Footer

export const query = graphql`
  {
    sanitySiteSettings(_id: { eq: "siteSettings" }) {
      _rawPrivacypage(resolveReferences: { maxDepth: 10 })
      footerMenu {
        _rawItem(resolveReferences: { maxDepth: 10 })
      }
    }
  }
`
