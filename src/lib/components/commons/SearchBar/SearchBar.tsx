import { DISPLAY_TEXTS, EFilterPanelStates } from '@/lib/consts/displayTexts';
import {
  StyledRemoveIcon,
  StyledSearchBar,
  StyledSearchIcon,
  StyledSearchInput,
} from './SearchBar.styled';
import { ISearchBarProps } from './SearchBar.types';
import { useSearchableContext } from './searchableContext';

export const SearchBar = ({ className }: ISearchBarProps) => {
  const { searchValue, setSearchValue } = useSearchableContext();
  return (
    <StyledSearchBar className={className}>
      {searchValue.length > 0 ? (
        <StyledRemoveIcon onClick={() => setSearchValue('')} />
      ) : (
        <StyledSearchIcon />
      )}
      <StyledSearchInput
        placeholder={DISPLAY_TEXTS.he.filterPanel[EFilterPanelStates.Search]}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </StyledSearchBar>
  );
};
