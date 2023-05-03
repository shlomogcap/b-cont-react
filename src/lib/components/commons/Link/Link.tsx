import NextLink from 'next/link';
import { StyledLink } from './Link.styled';
import { LinkProps } from './Link.types';

// about using this NextLink wrrapper see: https://github.com/vercel/next.js/issues/1942
export const Link = ({
  children,
  className,
  href,
  ...linkProps
}: LinkProps) => (
  <NextLink {...linkProps} href={href} passHref>
    <StyledLink className={className}>{children}</StyledLink>
  </NextLink>
);
