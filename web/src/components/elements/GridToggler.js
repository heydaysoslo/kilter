import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Grid, Container } from '.'
import { GridItem } from './Grid'
import useEventListener from '../hooks/useEventListener'
import keyCodes from '../../utils/keyCodes'
import Portal from '../Portal'

const GridToggler = ({ className }) => {
  const [showGrid, setShowGrid] = useState(false)
  const handler = e => {
    if (e.keyCode === keyCodes.g) {
      setShowGrid(showGrid => !showGrid)
    }
  }
  useEventListener('keydown', handler)
  if (!showGrid) return null
  return (
    <Portal>
      <div className={className}>
        <Container>
          <Grid gap={true}>
            {[...new Array(12)].map((_, i) => (
              <GridItem key={`grid-toggler-${i}`} span={{ xs: 1 }}>
                <div className="box"></div>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </div>
    </Portal>
  )
}

export default styled(GridToggler)(
  ({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    .box {
      width: 100%;
      height: 100vh;
      background: rgba(255, 0, 0, 0.5);
    }
  `
)
