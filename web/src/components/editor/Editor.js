import React from 'react'
import BaseBlockContent from '@sanity/block-content-to-react'

import { LinkResolver } from '../resolvers'
import Quote from './Quote'
import Figure from './Figure'
import Oembed from '../Oembed'
import { H3, H2, P, Button, Accordion, A } from '../elements'

const EditorLink = props => {
  // Make links work with previews:
  const linkProps = props?.mark?.projection || props.mark
  if (props?.mark?.linkStyle === 'button') {
    return (
      <Button as={LinkResolver} link={linkProps}>
        {props.children}
      </Button>
    )
  }
  return (
    <A className="link" as={LinkResolver} link={linkProps}>
      {props.children}
    </A>
  )
}

export const serializers = {
  types: {
    block(props) {
      if (props.node.children.text && props.node.children.text.length === 0)
        return null
      switch (props.node.style) {
        case 'h2':
          return <H2>{props.children}</H2>

        case 'h3':
          return <H3>{props.children}</H3>

        case 'lead':
          return <P modifiers="lead">{props.children}</P>

        case 'small':
          return (
            <P as="small" modifiers="small">
              {props.children}
            </P>
          )

        case 'button':
          if (!props.node.link) return null
          return (
            <p>
              <Button
                as={LinkResolver}
                data={props.node.link.link}
                modifiers="primary"
              >
                {props.node.link.title}
              </Button>
            </p>
          )

        case 'span':
          return <P as="span">{props.children}</P>

        default:
          return <P>{props.children}</P>
      }
    },
    button(props) {
      if (!props.node.link) return null
      return (
        <p>
          <Button
            as={LinkResolver}
            data={
              props.node.link.externalLink?.url || props.node.link.reference
            }
            modifiers={props.node.type && props.node.type}
          >
            {props.node.link.title}
          </Button>
        </p>
      )
    },
    quote(props) {
      if (!props.node.content) return null
      return <Quote quote={props.node} />
    },
    figure(props) {
      return <Figure node={props.node} />
    },
    oembed(props) {
      return <Oembed url={props.node.url} />
    },
    accordion(props) {
      return <Accordion items={props.node.items} exclusive defaultActive={2} />
    }
  },
  marks: {
    internalLink(props) {
      return <EditorLink {...props} />
    },
    link(props) {
      return <EditorLink {...props} />
    }
  }
}

const Editor = ({ blocks, ...props }) => {
  return (
    <div {...props}>
      <BaseBlockContent
        className="Editor__blocks"
        blocks={blocks}
        serializers={serializers}
      />
    </div>
  )
}

export default Editor
