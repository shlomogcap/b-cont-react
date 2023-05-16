import styled from 'styled-components';
import { IFormProps } from './Form.types';

export const StyledForm = styled.form<IFormProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  padding: 2rem 0 0 2rem;
  gap: 2rem;
`;

export const StyledFormFooter = styled.div`
  display: grid;
  grid-column: 1 / -1;
  grid-auto-flow: column;
  justify-content: center;
  padding: 1rem;
  gap: 2rem;
`;
