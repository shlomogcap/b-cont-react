import { tagMixin } from '@/lib/components/styles/mixins/tag';
import styled, { css } from 'styled-components';

export const StyledContractConfirms = styled.div`
  display: grid;
  font-size: 1.6rem;
  gap: 0rem !important;
  padding: 0;
  border: 1px solid white;
  background-color: #ebebeb;
`;

type IStyledConfirmCellProps = {
  danger?: boolean;
};

const StyledConfirmCell = styled.div<IStyledConfirmCellProps>`
  padding: 0.5rem;
  margin: 0;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ danger }) =>
    danger &&
    css`
      ${tagMixin({ variant: 'danger' })}
      font-weight: 600;
      font-size: 1.4rem;
    `}
`;
export const StyledConfirmLabel = styled(StyledConfirmCell)`
  font-size: 1.2rem;
  color: gray;
`;
export const StyledConfirmHeader = styled(StyledConfirmCell)`
  background-color: cornflowerblue;
  color: white;
  font-weight: 500;
`;
export const StyledConfirmValue = styled(StyledConfirmCell)`
  border: 1px dotted white;
  font-size: 1.6rem;
  text-align: center;
`;

export const StyledPeriod = styled.div`
  padding: 1rem;
  display: grid;
  grid-auto-flow: column;
  justify-items: flex-start;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
export const StyledPeriodLabel = styled.div`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 0.5rem;
  cursor: pointer;
`;
