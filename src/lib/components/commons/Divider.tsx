import styled from 'styled-components';

const StyledDivider = styled.hr`
  grid-column: 1 / -1;
  height: 2px;
  border: none;
  background-color: var(--color-gray-trs);
  margin-block: 4rem;
`;

export const Divider = ({ className }: { className?: string }) => {
  return <StyledDivider className={className} />;
};
