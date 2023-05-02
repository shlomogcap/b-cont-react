import React from 'react';
import {
  StyledBlockElement,
  StyledBlockGridLink,
  StyledBlocksGrid,
} from './BlocksGrid.styled';
import { BlocksGridProps } from './BlocksGrid.types';
import { SvgIconProps } from '../../icons/SvgIcon';
import Link from 'next/link';

export const BlocksGrid = ({ items }: BlocksGridProps) => {
  return (
    <StyledBlocksGrid>
      {items.map(({ id, text, icon, href, onClick }) => {
        const element = (
          <StyledBlockElement key={id} onClick={onClick}>
            {icon && React.cloneElement<SvgIconProps>(icon, { size: 'XL' })}
            {text && <div className='text'>{text}</div>}
          </StyledBlockElement>
        );
        return href ? (
          <StyledBlockGridLink href={href}>{element}</StyledBlockGridLink>
        ) : (
          element
        );
      })}
    </StyledBlocksGrid>
  );
};
