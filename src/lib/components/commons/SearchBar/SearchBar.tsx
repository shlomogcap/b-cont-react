import { DISPLAY_TEXTS, EFilterPanelStates } from '@/lib/consts/displayTexts';
import { SearchIcon } from '../../icons/SearchIcon';
import { StyledSearchBar, StyledSearchInput } from './SearchBar.styled';
import { ISearchBarProps } from './SearchBar.types';

export const SearchBar = (props: ISearchBarProps) => {
  const { searchProps } = props;
  const { searchValue, setSearchValue } = searchProps;
  return (
    <>
      <StyledSearchBar>
        <StyledSearchInput
          name='search'
          placeholder={DISPLAY_TEXTS.he.filterPanel[EFilterPanelStates.Search]}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <SearchIcon />
      </StyledSearchBar>
    </>
  );
};
