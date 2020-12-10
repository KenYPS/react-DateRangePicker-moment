import * as React from 'react'
import styled from 'styled-components'

import { CSSTransition } from 'react-transition-group'

// style

export default ({ children, timeout = 300, inProps = false }) => {
  return (
    <StyleTransition in={inProps} timeout={timeout} classNames="grow-shrink">
      {children}
    </StyleTransition>
  )
}

const StyleTransition = styled(CSSTransition)`
  position: relative;
  transition: ${({ timeout }) => timeout + 'ms'};
  &.grow-shrink-enter {
    height: 358px !important;
  }
  &.grow-shrink-enter-active {
    height: 405px !important;
  }
  &.grow-shrink-enter-done {
    height: 405px !important;
  }

  &.grow-shrink-exit {
    height: 405px !important;
  }
  &.grow-shrink-exit-active {
    height: 358px !important;
  }
  &.grow-shrink-exit-done {
    height: 358px !important;
  }
`
