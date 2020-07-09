import React, { useContext } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import AppContext from './context/AppContext'
import FadeIn from './FadeIn'
import MenuItems from './MenuItems'
import Portal from './Portal'
import styled, { css } from 'styled-components'
import { spacing, bp } from '../styles/utilities'
import { Container } from './elements'
import Hamburger from './elements/Hamburger'

const Menu = ({ className }) => {
  const data = useStaticQuery(query)
  const menu = data.sanitySiteSettings?.primaryMenu?._rawItem
  const { state, actions } = useContext(AppContext)

  return (
    <nav className={className}>
      <div className="desktop">
        <MenuItems menu={menu} />
      </div>
      <div className="mobile">
        <button className="close" onClick={() => actions.toggleMenu()}>
          <Hamburger open={state.showMenu} color="black" />
        </button>
        <Portal>
          <StyledFadeIn trigger={state?.showMenu}>
            <div className="cover">
              <Container className="container">
                <div className="wrapper">
                  <MenuItems
                    menu={menu}
                    closeMenu={() => actions.toggleMenu(false)}
                  />
                </div>
              </Container>
            </div>
          </StyledFadeIn>
        </Portal>
      </div>
    </nav>
  )
}

// Styled separate because of portal
const StyledFadeIn = styled(FadeIn)(
  ({ theme, trigger }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.7);
    pointer-events: ${trigger ? 'auto' : 'none'};

    .close {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
    }

    .wrapper {
      display: flex;
      flex-direction: column;

      .item {
        margin-left: 0;
      }
    }
  `
)

export default styled(Menu)(
  ({ theme }) => css`
    .mobile {
      display: none;
      position: relative;
      ${bp.below.lg`
        display: flex;
        justify-content: flex-end;
      `}

      .close {
        position: relative;
        z-index: 99999;
      }
    }
    .desktop {
      display: none;
      ${bp.above.lg`
        display: block;
      `}
    }

    .container {
      ${spacing.sm('pt')}
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: row-reverse;
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
