import styled from 'styled-components';
import { FOOTER_HEIGHT } from '../../../consts/stylesConsts';

export const StyledFooter = styled.footer`
  background: var(--color-active-light);
  width: 100%;
  height: ${FOOTER_HEIGHT};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 1fr max-content;
  padding: 3rem;
  position: fixed;
  bottom: 0;
`;
