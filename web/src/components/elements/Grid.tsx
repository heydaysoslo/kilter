import React from 'react'
import styled, { css } from 'styled-components'
import { bp, spacing } from '../../styles/utilities'
import {
  FlexBoxAlignItems,
  FlexBoxJustifyContent,
  ResonsiveFlexBoxAlignItems,
  ResonsiveFlexBoxJustifyContent,
  ResponsiveColumns,
  ResponsiveReverse,
  SpacingUnits
} from '../../types'

type Props = {
  className?: string
  columns?: ResponsiveColumns | number // This will override span in GridItem
  reverse?: ResponsiveReverse | boolean
  align?: ResonsiveFlexBoxAlignItems | FlexBoxAlignItems
  justify?: ResonsiveFlexBoxJustifyContent | FlexBoxJustifyContent
  gapUnit?: SpacingUnits
  gap?: object | boolean
  gapY?: object | boolean
  gapX?: object | boolean
}

type GridItemProps = {
  className?: string
  offset?: ResponsiveColumns | number
  span?: ResponsiveColumns | number
}

const BaseGrid: React.FC<Props> = ({ className, children }) => {
  if (!children) return null
  return <div className={className}>{children}</div>
}

const BaseGridItem: React.FC<GridItemProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

const setGridItemSpan = ({ span, theme }) => {
  if (span === 'auto') {
    return css`
      flex: 0 0 auto;
      width: auto;
      max-width: 100%;
    `
  }
  switch (typeof span) {
    case 'object':
      return Object.keys(span).map(
        key => bp.above[key]`
        ${setGridItemSpan({ span: span[key], theme })};
          `
      )
    case 'number':
      if (span >= 1) {
        return css`
          flex-basis: ${(span / (theme?.grid?.columns || 12)) * 100}%;
          max-width: ${(span / (theme?.grid?.columns || 12)) * 100}%;
        `
      } else {
        return css`
          flex-basis: ${span * 100}%;
          max-width: ${span * 100}%;
        `
      }
  }
}

const setGridItemOffset = ({ offset, theme }) => {
  switch (typeof offset) {
    case 'object':
      return Object.keys(offset).map(
        key => bp.above[key]`
        ${setGridItemOffset({ offset: offset[key], theme })};
          `
      )
    case 'number':
      if (offset >= 1) {
        return css`
          margin-left: ${(offset / (theme?.grid?.columns || 12)) * 100}%;
        `
      } else {
        return css`
          margin-left: ${offset * 100}%;
        `
      }
  }
}

const setAlignItems = ({ align, theme }) => {
  switch (typeof align) {
    case 'string':
      return css`
        align-items: ${align};
      `
    case 'object':
      return Object.keys(align).map(
        key => bp.above[key]`
          align-items: ${align[key]};
        `
      )
  }
}

const setJustifyContent = ({ justify, theme }) => {
  switch (typeof justify) {
    case 'string':
      return css`
        justify-content: ${justify};
      `
    case 'object':
      return Object.keys(justify).map(
        key => bp.above[key]`
          justify-content: ${justify[key]};
        `
      )
  }
}

export const GridItem = styled(BaseGridItem)<GridItemProps>(
  ({ theme, span, offset }) => css`
    box-sizing: border-box;
    flex: 1 1 0;
    max-width: 100%;

    ${setGridItemSpan({ span, theme })};
    ${setGridItemOffset({ offset, theme })};
  `
)

const setResponsiveColumns = columns => {
  switch (typeof columns) {
    case 'number':
      return css`
        flex-basis: ${100 / columns}%;
        max-width: ${100 / columns}%;
      `
    case 'object':
      return Object.keys(columns).map(
        key => bp.above[key]`
          ${setResponsiveColumns(columns[key])};
        `
      )
  }
}

/*
Possible to pass the following units:
- Hard unit: vw, px, %, rem, etc
- Theme spacing unit: 'gutter', 'lg'
- Boolean: true (default spacing unit), false (no gutter at all)
*/
const setResponsiveGaps = ({ gap, cssProps, multiplier }) => {
  switch (typeof gap) {
    case 'object':
      return Object.keys(gap).map(
        key => bp.above[key]`
          ${setResponsiveGaps({ gap: gap[key], multiplier, cssProps })}
        `
      )
    case 'number':
      return spacing({ val: `${gap}px`, cssProps, multiplier })
    case 'boolean':
      const defaultGapUnit = 'gutter'
      return spacing[defaultGapUnit](cssProps, {
        multiplier: gap ? multiplier : 0
      })
    default:
      if (spacing[gap]) {
        return spacing[gap](cssProps, { multiplier })
      } else {
        return spacing({ val: gap, cssProps, multiplier })
      }
  }
}

export default styled(BaseGrid)<Props>(
  ({ columns, gap, gapY, gapX, reverse, align, justify, theme }) => css`
    display: flex;
    flex: 0 1 auto;
    flex-direction: ${reverse ? 'row-reverse' : 'row'};
    flex-wrap: wrap;
    justify-content: ${justify ? justify : 'flex-start'};
    min-height: 0;

    ${align &&
      setAlignItems({
        align
      })}

    ${justify &&
      setJustifyContent({
        justify
      })}

    /* Add responsive negative margins to container */
    /* Vertical */
    ${gapY &&
      setResponsiveGaps({
        gap: gapY,
        multiplier: -1,
        cssProps: 'mb'
      })}

    /* Horizontal */
    ${gapX &&
      setResponsiveGaps({
        gap: gapX,
        multiplier: -0.5,
        cssProps: 'mx'
      })}

    /* Vertical + horizontal */
    ${gap &&
      setResponsiveGaps({
        gap,
        multiplier: -0.5,
        cssProps: 'mx'
      })}

    ${gap &&
      setResponsiveGaps({
        gap,
        multiplier: -1,
        cssProps: 'mb'
      })}

    > ${GridItem} {

      /* Add responsive margins to GridItem */
      /* Vertical */
      ${gapY &&
        setResponsiveGaps({
          gap: gapY,
          multiplier: 1,
          cssProps: 'pb'
        })}

      /* Horizontal */
      ${gapX &&
        setResponsiveGaps({
          gap: gapX,
          multiplier: 0.5,
          cssProps: 'px'
        })}

      /* Vertical + horizontal */
      ${gap &&
        setResponsiveGaps({
          gap,
          multiplier: 0.5,
          cssProps: 'px'
        })}

      ${gap &&
        setResponsiveGaps({
          gap,
          multiplier: 1,
          cssProps: 'pb'
        })}

        ${columns && setResponsiveColumns(columns)}

    }
  `
)
