import styled from 'styled-components';
import { highlightRowMixin } from '../../styles/mixins/highlightRow';
import { ACTIVE_TAB_CLASS_NAME } from './Tabs.consts';

export const StyledTabs = styled.div`
  align-self: flex-start;
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
`;

export const StyledTabElement = styled.div`
  text-align: center;
  border-bottom: 1px solid lightgray;
  font: inherit;
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-non-active);
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  &.${ACTIVE_TAB_CLASS_NAME} {
    color: var(--color-active);
    border-bottom: 2px solid var(--color-active);
  }
  &:not(.${ACTIVE_TAB_CLASS_NAME}) {
    &:hover {
      color: var(--color-active);
    }
    ${highlightRowMixin({ trigger: 'hover', side: 'bottom' })}
    &[data-path]:hover {
      text-decoration: underline;
    }
  }
`;
