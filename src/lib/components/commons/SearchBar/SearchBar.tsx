import { DISPLAY_TEXTS, EFilterPanelStates } from '@/lib/consts/displayTexts';
import { SearchIcon } from '../../icons/SearchIcon';
import { StyledSearchBar, StyledSearchInput } from './SearchBar.styled';
import { ISearchBarProps } from './SearchBar.types';
import { useSearchableContext } from './SearchableContext';

export const SearchBar = ({ className }: ISearchBarProps) => {
  const { searchValue, setSearchValue } = useSearchableContext();
  return (
    <StyledSearchBar className={className}>
      <StyledSearchInput
        type='search'
        placeholder={DISPLAY_TEXTS.he.filterPanel[EFilterPanelStates.Search]}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <SearchIcon />
    </StyledSearchBar>
  );
};
