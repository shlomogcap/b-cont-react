import React from 'react';
import { StyledBlockElement, StyledBlocksGrid } from './BlocksGrid.styled';
import { BlocksGridProps } from './BlocksGrid.types';
import { SvgIconProps } from '../../icons/SvgIcon';

export const BlocksGrid = ({ items }: BlocksGridProps) => {
  return (
    <StyledBlocksGrid>
      {items.map(({ id, text, icon }) => (
        <StyledBlockElement key={id}>
          {icon && React.cloneElement<SvgIconProps>(icon, { size: 'XL' })}
          {text && <div className='text'>{text}</div>}
        </StyledBlockElement>
      ))}
    </StyledBlocksGrid>
  );
};
