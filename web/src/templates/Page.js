import React from 'react'
import { graphql } from 'gatsby'

import { TemplateResolver } from '../components/resolvers'

/**
 * Passing variables into query
 *
 * https://graphql.org/learn/queries/#variables
 *
 * The ID comes from gatsby-config where the context.id is passed in
 *
 */

const PageTemplate = props => {
  const { data } = props
  const page = data && data?.page

  return page && <TemplateResolver page={page} />
}

export default PageTemplate

export const query = graphql`
  query PageQuery($id: String!) {
    page: sanityPage(id: { eq: $id }) {
      ...Page
    }
  }
  fragment Page on SanityPage {
    _key
    title
    _type
    template
    slug {
      current
    }
    pagebuilder: _rawPagebuilder(resolveReferences: { maxDepth: 20 })
    seo {
      ...SEO
    }
  }
`
