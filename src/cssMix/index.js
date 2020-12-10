import { css } from "styled-components";

// constants
const PC_BREAKPOINT_WIDTH = 1024; 


const sizes = {
  pc: "pc", 
  tablet: "tablet", 
  mobile: "mobile" 
};

// refs: https://www.styled-components.com/docs/advanced#media-templates
// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => {
    if (label === "tablet") {
      return css`
        @media (max-width: ${PC_BREAKPOINT_WIDTH}px) {
          ${css(...args)}
        }
      `.join("");
    } 
    // else if (label === "tablet") {
    //   return css`
    //     @media (max-width: ${TABLET_BREAKPOINT_WIDTH}px) {
    //       ${css(...args)}
    //     }
    //   `.join("");
    // } 
    // else {
    //   return css`
    //     @media (min-width: ${MOBILE_BREAKPOINT_WIDTH}px) and (max-width: ${PC_BREAKPOINT_WIDTH -
    //         1}px) {
    //       ${css(...args)}
    //     }
    //   `.join("");
    // }
  };

  return acc;
}, {});