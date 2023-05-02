import React from 'react';
import { StyledBlockElement, StyledBlocksGrid } from './BlocksGrid.styled';
import { BlocksGridProps } from './BlocksGrid.types';

export const BlocksGrid = ({ items }: BlocksGridProps) => {
  return (
    <StyledBlocksGrid>
      {items.map(({ id, text, icon }) => (
        <StyledBlockElement key={id}>
          {icon}
          {text && <div className='text'>{text}</div>}
        </StyledBlockElement>
      ))}
    </StyledBlocksGrid>
  );
};
