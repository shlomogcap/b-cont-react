import { useRouter } from 'next/router';
import { StyledSidebarLink } from './Sidebar.styled';
import { ISidebarLinkProps } from './Sidebar.types';
import { Tooltip } from '../../commons/Tooltip';
import { useBreakpoint } from '@/lib/hooks/useBreakpoint';
import { Breakpoints } from '../../../consts/stylesConsts';

export const SidebarLink = ({ text, href, icon }: ISidebarLinkProps) => {
  const { asPath } = useRouter();
  const isActive = asPath.startsWith(href.toString());
  const isBigDesktop = useBreakpoint(`(min-width: ${Breakpoints.BigDesktop})`);
  const link = (
    <StyledSidebarLink href={href} className={`${isActive ? 'active' : ''}`}>
      {icon}
      <div className='text'>{text}</div>
    </StyledSidebarLink>
  );
  return isBigDesktop ? link : <Tooltip content={text}>{link}</Tooltip>;
};
