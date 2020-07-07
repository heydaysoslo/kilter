import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import TemplateResolver from '../components/resolvers/TemplateResolver'

const Article = props => {
  const { data } = props
  const article = data && data.article

  return (
    <Layout {...article}>
      <TemplateResolver page={article} />
    </Layout>
  )
}

export default Article

export const query = graphql`
  query NewsQuery($id: String!) {
    article: sanityArticle(id: { eq: $id }) {
      ...Article
    }
  }
  fragment Article on SanityArticle {
    _id
    _key
    _type
    slug {
      current
    }
    title
    publishDate(formatString: "DD.MMMM-YY", locale: "nb_NO")
    dateString: publishDate
    _rawSlug(resolveReferences: { maxDepth: 20 })
    _rawExcerpt(resolveReferences: { maxDepth: 20 })
    body: _rawBody(resolveReferences: { maxDepth: 20 })
    _rawMainImage(resolveReferences: { maxDepth: 20 })
    mainImage {
      ...MainImage
    }
    authors: _rawAuthors(resolveReferences: { maxDepth: 20 })
    pagebuilder: _rawPagebuilder(resolveReferences: { maxDepth: 20 })
    seo {
      ...SEO
    }
  }
`
