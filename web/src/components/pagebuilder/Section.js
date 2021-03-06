import React from 'react'

import Editor from '../editor/'
import { P, H2, Grid, GridItem, Stagger, Animate } from '../elements'
import styled, { css } from 'styled-components'

const Section = props => {
  const { title, subtitle, editorMinimal, className } = props
  return (
    <Stagger className={className}>
      {(subtitle || title) && (
        <Grid gap={true}>
          <GridItem offset={{ xs: 0, md: 2 }} span={{ xs: 12, md: 4 }}>
            {title && <H2 className="label">{title}</H2>}
            {subtitle && (
              <P modifiers={['small', 'grey']} className="label">
                {subtitle}
              </P>
            )}
          </GridItem>
        </Grid>
      )}
      {editorMinimal && (
        <Grid gap={true}>
          <GridItem span={{ xs: 12, md: 8 }}>
            <Animate>
              <Editor className="content" blocks={editorMinimal} />
            </Animate>
          </GridItem>
        </Grid>
      )}
    </Stagger>
  )
}

export default styled(Section)(({ theme }) => css``)
