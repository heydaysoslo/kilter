import React, { useState, useEffect, ComponentType, Component } from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { applyStyleModifiers } from 'styled-components-modifiers'

/**
 *
 * Converts svg files from icons folder into react components with inline svg.
 * To change folder see `gatsby-config.js` and query below
 *
 * Usage:
 * <Icon name="facebook" modifiers="small" />
 * <Icon name="twitter" />
 * <Icon name="instagram" color="orange"/>
 * <Icon name="email" modifiers="large" />
 *
 * @param {string} name // name of the icon file without extension.
 * @param {string} color // overrides colors
 */

type Name =
  | 'email'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'pinterest'
  | 'podcast'
  | 'spotify'
  | 'twitter'
  | 'rss'
  | 'logo'

type Props = {
  name: Name
  color?: string
  className?: string
}

const Icon = ({ className, name }: Props) => {
  const data = useStaticQuery(query)
  const icons = data?.allFile?.nodes
  const [Component, setComponent] = useState<ComponentType<{
    className?: string
  }> | null>(null)

  const icon = icons.find(
    icon => icon.name.toLowerCase() === name.toLowerCase()
  )

  useEffect(() => {
    if (icon?.name && icon?.ext) {
      import(`../../assets/icons/${icon.name}${icon.ext}`).then(comp => {
        setComponent(() => comp.default) // Renderer expects a functional component
      })
    }
  }, [icon])

  if (!icon) {
    console.warn(`Icon with name ${name} does not exist 🤷‍♂️`)
    return null
  }

  return Component && <Component className={className} />
}

export default styled(Icon)<Props>(
  ({ theme, color }) => css`
    display: inline-block;
    height: 100%;
    width: 100%;

    .cls-3 {
      fill: green;
    }

    /* Override color */
    ${color &&
      css`
        .cls-3,
        .cls-2 {
          fill: ${color};
        }
      `}
  `
)

// Get all file names in icon folder with svg extension
export const query = graphql`
  {
    allFile(
      filter: { relativePath: { regex: "/icons/" }, extension: { eq: "svg" } }
    ) {
      nodes {
        extension
        name
        ext
      }
    }
  }
`
