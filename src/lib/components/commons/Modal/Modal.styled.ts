import styled from 'styled-components';
import { IStyledModalProps } from './Modal.types';

export const StyledModal = styled.div<IStyledModalProps>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabledOutsideClick }) =>
    disabledOutsideClick ? 'not-allowed' : 'pointer'};
`;

export const StyledModalBox = styled.div`
  padding: 2.5rem;
  padding-block: 2rem;
  position: relative;
  cursor: context-menu;
  min-width: 30rem;
  min-height: 30rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: var(--box-shadow-3);
  display: grid;
  justify-items: center;
  align-items: center;
  gap: 2rem;
  max-height: 100vh;
  overflow-y: scroll;
`;

export const StyledModalTitle = styled.div`
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--color-active-light);
  border-radius: 1rem 1rem 0 0;
  color: #f8f8f8;
  padding: 1rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  max-height: 4rem;
  padding: 0.5rem;
`;
