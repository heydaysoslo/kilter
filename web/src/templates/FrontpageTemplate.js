import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { TemplateResolver } from '../components/resolvers'

const FrontpageTemplate = props => {
  const { data } = props
  const page = data?.sanityFrontpage
  return (
    <Layout page={page}>
      <TemplateResolver page={page} />
    </Layout>
  )
}

export default FrontpageTemplate

export const frontpageQuery = graphql`
  query frontpageQuery($id: String!) {
    sanityFrontpage(id: { eq: $id }) {
      _id
      _key
      title
      _type
      template
      _rawPagebuilder(resolveReferences: { maxDepth: 20 })
      seo {
        ...SEO
      }
    }
  }
`
