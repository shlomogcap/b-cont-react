import { Breakpoints } from '@/lib/consts/stylesConsts';
import { scorllBarMixin } from '@/lib/components/styles/mixins/scrollbar';
import { createGlobalStyle } from 'styled-components';

type Props = {
  dir: 'ltr' | 'rtl';
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
    --font-size-small: 1.2rem;
    --font-size-normal: 1.8rem;
    --font-size-large: 2.2rem;
    --font-size-xl: 2.8rem;
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


    font-size: 62.5%;
    @media only screen and (max-width: ${Breakpoints.Phone}) {
        font-size: 50%;
    }
    @media only screen and (max-width: ${Breakpoints.TabPort}) {
        font-size: 55%;
    }
    @media only screen and (max-width: ${Breakpoints.TabLand}) {
        font-size: 60%;
    }
    @media only screen and (min-width: ${Breakpoints.BigDesktop}) {
        font-size: 65%;
    }
}

/* GLOBAL RESET */
* {
    padding: 0;
    margin: 0;
    &,
    &::before,
    &::after {
        box-sizing: border-box;
    }
}
body {
    direction: var(--dir);
    font-family: var(--def-font-family);
    font-size: var(--font-size-normal);
    font-weight: var(--font-w-1);
    line-height: 1.8;
    user-select: none;
    color:var(--color-black)
}
a{
    text-decoration: none;
}
`;
