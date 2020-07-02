import React, { useContext } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled, { css } from 'styled-components'

import Menu from './Menu'
import { Container, Icon, Grid, GridItem } from './elements'
import { spacing } from '../styles/utilities'
import { LinkResolver } from './resolvers'
import AppContext from './context/AppContext'

type Props = {
  className?: string
}

const Header = ({ className }: Props) => {
  const data = useStaticQuery(query)
  const menuItems = data?.sanitySiteSettings?.primaryMenu?._rawItem
  const { state, actions } = useContext(AppContext)
  return (
    <header className={className}>
      <Container className="container">
        <Grid gapX align={{ xs: 'flex-start', md: 'flex-end' }}>
          <GridItem span={{ xs: 2, md: 2 }}>
            <Link className="logo" to="/">
              <Icon name="logo" />
            </Link>
          </GridItem>
          <GridItem span={{ xs: 6, md: 4 }}>
            <h2>Kilter</h2>
            <p className="interactive-text">Systems in balance</p>
          </GridItem>
          <GridItem span={{ xs: 4, md: 6 }}>
            {menuItems && (
              <Menu>
                {menuItems.map(item => (
                  <LinkResolver
                    key={item._key}
                    link={item}
                    onClick={() => state.ShowMenu && actions.toggleMenu(false)}
                  >
                    {item?.title || item?.reference?.title}
                  </LinkResolver>
                ))}
              </Menu>
            )}
          </GridItem>
        </Grid>
      </Container>
    </header>
  )
}

export default styled(Header)(
  ({ theme }) => css`
    ${spacing.sm('py')};

    .logo {
      display: inline-block;
      display: flex;
      align-items: center;
      width: 4.5rem;
      margin-bottom: 6px;
    }
  `
)

export const query = graphql`
  {
    sanitySiteSettings(_id: { eq: "siteSettings" }) {
      primaryMenu {
        _rawItem(resolveReferences: { maxDepth: 10 })
      }
    }
  }
`
