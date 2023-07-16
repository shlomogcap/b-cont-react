import { css } from 'styled-components';

const tagStyles = css`
  text-align: center;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;
type ITagMixinProps = {
  variant: 'danger' | 'info' | 'active' | 'nonActive' | 'pending';
};
export const tagMixin = ({ variant }: ITagMixinProps) => css`
  ${tagStyles}
  ${() => {
    switch (variant) {
      case 'danger':
        return css`
          background-color: #ea2e6333 !important;
          color: var(--color-red) !important;
        `;
      case 'active':
        return css`
          background-color: var(--color-active) !important;
          color: white !important;
        `;
      case 'nonActive':
        return css`
          color: var(--color-non-active) !important;
        `;
      case 'info':
        return css`
          background-color: var(--color-active-trs) !important;
          color: var(--color-active) !important;
        `;
      case 'pending':
        return css`
          background-color: var(--color-pending) !important;
          color: var(--color-white) !important;
        `;
    }
  }}
`;
