import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import { spacing } from '../styles/utilities'
import { motion } from 'framer-motion'

import { Grid, Container, GridItem, Icon, P } from './elements'
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
  // const menu = data?.sanitySiteSettings?.footerMenu?._rawItem
  const privacyPage = data?.sanitySiteSettings?._rawPrivacypage
  const companyInfo = data?.sanityCompanyInfo
  console.log('Footer -> companyInfo', companyInfo)
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
            <Icon name="logo" />
            <P modifiers="grey">
              &copy; {new Date().getFullYear()}&nbsp;
              {companyInfo?.name && companyInfo.name}. All rights reserved.
            </P>
          </GridItem>
          <GridItem offset={{ xs: 0, md: 5 }} span={{ xs: 6, md: 2 }}>
            <P>
              {companyInfo?.name && (
                <span>
                  {companyInfo?.name}
                  <br />
                </span>
              )}
              {companyInfo?.address?.streetAddress && (
                <span>
                  {companyInfo?.address?.streetAddress}
                  <br />
                </span>
              )}
              {companyInfo?.address?.postCode && (
                <span>{companyInfo?.address?.postCode}&nbsp;</span>
              )}
              {companyInfo?.address?.region && (
                <span>{companyInfo?.address?.region}</span>
              )}
            </P>
          </GridItem>
          {/* <GridItem span={{ xs: 6, md: 3 }}>
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
          </GridItem> */}
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
    sanityCompanyInfo(_id: { eq: "companyInfo" }) {
      email
      name
      address {
        postCode
        country
        city
        region
        streetAddress
      }
      phone
      _id
    }
  }
`
