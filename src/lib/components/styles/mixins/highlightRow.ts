import { css } from "styled-components";

const onlyBottomSide = css`
  &::before {
    width: 0;
    height: 0;
    bottom: 0;
  }
  &:hover::before {
    height: 0.2rem;
    width: 100%;
  }
`;
const otherSides = css`
  &::before {
    width: 0.5rem;
    height: 20%;
    top: 50%;
    transform: translateY(-50%);
  }
`;
const rightPosition = css`
  &::before {
    right: 0;
  }
`;
const otherPosition = css`
  &::before {
    left: 0;
  }
`;

type HightlightRowMixinProps = {
  side: "left" | "right" | "bottom";
  trigger?: "hover" | "constant";
};
export const highlightRowMixin = ({
  trigger,
  side,
}: HightlightRowMixinProps) => css`
  & {
    position: relative;
  }
  &::before {
    visibility: hidden;
    opacity: 0;
    content: "";
    position: absolute;
    background: var(--color-active);
    transition: all 0.4s ease-in-out;
  }
  ${() => {
    if (trigger === "hover") {
      return css`
        &:hover::before {
          visibility: visible;
          opacity: 0.4 !important;
          height: 80% !important;
        }
      `;
    } else if (trigger === "constant") {
      return css`
        &::before {
          visibility: visible;
          opacity: 1 !important;
          height: 80% !important;
        }
      `;
    } else {
      return css`
        &:focus-within::before {
          visibility: visible;
          opacity: 0.4 !important;
          height: 80% !important;
        }
      `;
    }
  }}
  ${() => (side === "right" ? rightPosition : otherPosition)}
  ${() => (side === "bottom" ? onlyBottomSide : otherSides)}
`;
