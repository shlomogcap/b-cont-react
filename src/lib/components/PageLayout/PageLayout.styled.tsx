import styled from "styled-components";

export const StyledPageLayout = styled.div`
  min-width: fit-content;
  background-color: var(--color-bg-layout);
  .page{
    display: grid;
		grid-template-columns: [sidebar] 30rem [center-start] 1fr [center-end];
		position: relative;
  }
`;
