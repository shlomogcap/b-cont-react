import React from 'react';
import { StyledIBlockElement, StyledBlocksGrid } from './BlocksGrid.styled';
import { IBlocksGridProps } from './BlocksGrid.types';
import { ISvgIconProps } from '../../icons/SvgIcon';
import { Link } from '../Link';

export const BlocksGrid = ({ items }: IBlocksGridProps) => {
  return (
    <StyledBlocksGrid>
      {items.map(({ id, text, icon, href, onClick, selected }) => {
        const element = (
          <StyledIBlockElement key={id} onClick={onClick} selected={selected}>
            {icon && React.cloneElement<ISvgIconProps>(icon, { size: 'XL' })}
            {text && <div className='text'>{text}</div>}
          </StyledIBlockElement>
        );
        return href ? (
          <Link key={id} href={href} onClick={onClick}>
            {element}
          </Link>
        ) : (
          element
        );
      })}
    </StyledBlocksGrid>
  );
};
