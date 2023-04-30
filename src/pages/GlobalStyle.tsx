import { createGlobalStyle } from "styled-components";

type Props = {
  dir: "ltr" | "rtl";
};

export const GlobalStyle = createGlobalStyle<Props>`
    :root {
    //LANGUGE
    --dir: ${({ dir }) => dir};
    --lang: "he";

    // COLORS
    --color-bg-layout: #ecf0f6;
    --color-bg-1: #d3d3d3a1;
    --color-bg-2: #d3d3d380;
    --color-bg-3: #ecf0f661;

    --color-non-active: #a2a2c4;
    --color-active: #234aa9;
    --color-active-light: #2349a99f;
    --color-active-trs: #2349a94d;
    --color-active-dark: #333666;

    --color-red: #eb2f64;
    --color-red-trs: #ea2e6399;

    --color-pending: #c7380d;

    --color-gray: #222;
    --color-gray-1: #494141;
    --color-gray-2: #d3d3d3;
    --color-gray-3: #ebe8e8;

    --color-gray-trs: #ecf0f678;

    --color-white: #fff;
    --color-black: #000;

    // FONTS
    --def-font-size: 1.6rem;
    --def-font-family: Rubik, "Tahoma", sans-serif;
    --font-family-1: var(--def-font-family);
    --font-family-2: Alef, "Tahoma", sans-serif;
    --font-w-1: 300;
    --font-w-2: 400;
    --font-w-3: 700;

    // BLOCKS
    --box-shadow-light: 0 1rem 2rem rgba(0, 0, 0, 0.1);
    --box-shadow-1: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    --box-shadow-2: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);
    --box-shadow-3: 0.1rem 0.9rem 2rem rgba(0, 0, 0, 0.4);
}

/* GLOBAL RESET */
* {
    padding: 0;
    margin: 0;
    &,
    &::before,
    &::after {
        font-size: 62.5%;
        box-sizing: border-box;
        @media only screen and (max-width: 75em) {
            font-size: 60%; //1 rem = 9px, 9/16 = 50%
        }
        @media only screen and (max-width: 56.25em) {
            font-size: 55%; //1 rem = 8px, 8/16 = 50%
        }
        @media only screen and (max-width: 37.5em) {
            font-size: 50%; //1 rem = 8px, 8/16 = 50%
        }
        @media only screen and (min-width: 112.5em) {
            font-size: 65%; //1rem = 12, 12/16
        }
    }
}
`;
