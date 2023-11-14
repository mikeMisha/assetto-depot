import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import titleCase from '../lib/titleCase';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { Filter } from '../../src/types/global';
import type { CarSearchState } from '../../src/store/slices/carSearchSlice';
import type { TrackSearchState } from '../../src/store/slices/trackSearchSlice';

type SearchFilters = CarSearchState['filters'] | TrackSearchState['filters'];

interface SearchProps<FiltersType> {
  activeFilters: FiltersType;
  handleFilters: (filterObj: Partial<SearchFilters>) => void;
  filters: Filter[];
  handleSearchValue: (value: string) => void;
  searchValue: string;
  handleSearchSubmit?: () => void;
}

const Search = <FiltersType extends Record<string, any>>({
  filters,
  activeFilters,
  handleFilters,
  searchValue,
  handleSearchValue,
  handleSearchSubmit,
}: SearchProps<FiltersType>) => {
  const [text, setText] = useState(searchValue);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleSearchValue(text);
    }, 800);
    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  const handleSelect = (e: SelectChangeEvent, label: Filter['label']) => {
    handleFilters({ [label]: e.target.value });
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexShrink: 0,
        py: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '50%' }}>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{ mb: 2 }}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            InputProps={
              handleSearchSubmit && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchSubmit}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }
          />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}
          >
            {filters.map((filter: Filter) => (
              <Box key={filter.label}>
                <FormControl variant="standard" sx={{ width: '100px', m: 2 }}>
                  <InputLabel id={`${filter.label}-label`}>
                    {titleCase(filter.label)}
                  </InputLabel>
                  <Select
                    labelId={`${filter.label}-label`}
                    id={filter.value}
                    value={activeFilters[filter.value] || ''}
                    onChange={(e) => handleSelect(e, filter.value)}
                    label={filter.label}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {filter.items.map((item) => (
                      <MenuItem key={item} value={item}>
                        {titleCase(item)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ))}
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Search;
