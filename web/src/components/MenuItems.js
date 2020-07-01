import React from 'react'
import styled, { css } from 'styled-components'

import { LinkResolver } from './resolvers'
import NewsletterWrapper from './Newsletter'
import { Modal, Grid, GridItem } from './elements'

const MenuItems = ({ menu, closeMenu, className }) => {
  if (!menu) return null
  return (
    <nav className={className}>
      <Grid gap justify="flex-end">
        {menu.map(item => (
          <GridItem span={{ xs: 12, md: 4 }} key={item._key}>
            <LinkResolver className="item" link={item} onClick={closeMenu}>
              {item?.title || item?.reference?.title}
            </LinkResolver>
          </GridItem>
        ))}
        <GridItem span={{ xs: 12, md: 4 }}>
          <Modal
            trigger={(open, setOpen) => (
              <button className="link" onClick={() => setOpen(true)}>
                {open ? 'Close' : 'Registrer interest'}
              </button>
            )}
            hideClose
          >
            {({ close }) => (
              <>
                <NewsletterWrapper />
                <button label="modal" onClick={close}>
                  Close
                </button>
              </>
            )}
          </Modal>
        </GridItem>
      </Grid>
    </nav>
  )
}

export default styled(MenuItems)(
  ({ theme }) => css`
    .item {
      color: ${theme.colors.black};
    }
  `
)
