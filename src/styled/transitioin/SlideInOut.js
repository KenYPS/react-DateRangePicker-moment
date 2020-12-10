import * as React from "react";
import styled from 'styled-components'

import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

// style

export default ({ children, keyName, classNames, timeout = 300 }) => {
  return (
    <StyleTransitionGroup
      timeout={timeout}
      childFactory={(child) => React.cloneElement(child, { classNames })}
    >
      <CSSTransition key={keyName} timeout={timeout} classNames={classNames}>
        {children}
      </CSSTransition>
    </StyleTransitionGroup>
  )
};


const StyleTransitionGroup = styled(TransitionGroup)`
position: relative;
>div{
    width:100%;
    position: absolute;
top:50%;
left:50%; 
transform:translate(-50%,-50%);
}


.add-Month-enter {
  transform: translate(60%, -50%) !important;
}
.add-Month-enter-active {
  transform: translate(-50%, -50%) !important;
}
.add-Month-exit {
  transform: translate(-50%, -50%)!important;
}
.add-Month-exit-active {
  transform: translate(-160%, -50%)!important;
}
.add-Month-enter-active,
.add-Month-exit-active {
transition: ${({ timeout }) => timeout + 'ms'};

}

.last-Month-enter {
  transform: translate(-160%, -50%)!important;
}
.last-Month-enter-active {
  transform: translate(-50%, -50%)!important;
}
.last-Month-exit {
  transform: translate(-50%, -50%)!important;
}
.last-Month-exit-active {
  transform: translate(60%, -50%)!important;
}
.last-Month-enter-active,
.last-Month-exit-active {
transition: ${({ timeout }) => timeout + 'ms'};

}

`