import styled from 'styled-components';
import { Form } from '../commons/Form';

export const StyledContractSectionForm = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  align-content: space-between;
  grid-row-gap: 4rem;
`;

export const StyledContractSectionFormFields = styled(Form)`
  width: 100%;
  align-content: flex-start;
`;
