import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { nanoid } from 'nanoid'

import { setOverflowHidden } from '../../utils/helpers'
import Portal from '../Portal'
import { Button } from '.'
import styled, { css } from 'styled-components'
import { bp, color } from '../../styles/utilities'
import { transitions } from './AnimateInView'

const modalId = nanoid(10)

const Modal = ({
  trigger,
  children,
  hideClose,
  contentMaxWidth,
  className
}) => {
  const [open, setOpen] = useState(false)
  const content = useRef(null)

  useEffect(() => {
    setOverflowHidden(open)
  }, [open])

  const outsideClick = event => {
    if (content && content.current && !content.current.contains(event.target)) {
      setOpen(false)
    }
  }

  const Trigger = trigger(open, setOpen)

  return (
    <>
      {Trigger}
      <AnimatePresence>
        {open && (
          <Portal>
            <motion.div
              key={`modal-${modalId}`}
              initial={transitions.fadeIn.hidden}
              animate={{
                ...transitions.fadeIn.visible,
                transition: {
                  duration: 0.25
                }
              }}
              exit={{
                ...transitions.fadeIn.hidden,
                transition: {
                  duration: 0.25
                }
              }}
              className={className}
            >
              <div
                role="button"
                tabIndex="0"
                onClick={outsideClick}
                onKeyDown={outsideClick}
                className="Modal"
              >
                <div className="Modal__backdrop" />
                <div className="Modal__container">
                  <div
                    ref={content}
                    style={
                      contentMaxWidth && {
                        maxWidth: contentMaxWidth,
                        width: '100%'
                      }
                    }
                    className="Modal__content"
                  >
                    {children({
                      close: () => setOpen(false),
                      isOpen: open
                    })}
                  </div>
                </div>
                {!hideClose && (
                  <Button
                    variant="link"
                    className="Modal__close"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </Button>
                )}
              </div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}

export default styled(Modal)(
  ({ theme }) => css`
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: fixed;
    backface-visibility: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 2000;

    .Modal__container {
      text-align: center;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;

      /* Vertical alignment fix */
      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
    }

    .Modal__content {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      margin: 0 auto;
      z-index: 10;
      text-align: left;
      width: 100%;
    }

    .Modal__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${color.rgba(theme.colors.background, 0.95)};
      z-index: 0;
    }

    .Modal__close {
      position: absolute;
      top: 2rem;
      right: 1.5rem;
      z-index: 20;
      ${bp.above.md`
        top: 3rem;
        right: 2rem;
      `}
    }
  `
)
