import { useRef } from 'react';
import { Link } from '../Link';
import { ACTIVE_TAB_CLASS_NAME } from './Tabs.consts';
import { StyledTabElement, StyledTabs } from './Tabs.styled';
import { ITabProps, ITabsProps } from './Tabs.types';

const Tab = ({ href, text, isActive, onClick }: ITabProps) => {
  const tab = (
    <StyledTabElement
      onClick={onClick}
      className={isActive ? ACTIVE_TAB_CLASS_NAME : ''}
      data-path={href}
    >
      {text}
    </StyledTabElement>
  );
  return href ? <Link href={href}>{tab}</Link> : tab;
};

export const Tabs = <T extends string>({
  tabs,
  activeTab,
  setActiveTab,
}: ITabsProps<T>) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  return (
    <StyledTabs ref={tabsRef}>
      {tabs.map(({ id, text }) => (
        <Tab
          onClick={() => {
            setActiveTab(id);
            tabsRef.current?.scrollIntoView({ block: 'center' });
          }}
          text={text}
          key={id}
          isActive={activeTab === id}
        />
      ))}
    </StyledTabs>
  );
};
