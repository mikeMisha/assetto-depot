import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import titleCase from '../../utils/titleCase';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const Search = ({
  filtersValues,
  handleFilters,
  filters,
  handleSearchValue,
  searchValue,
  handleSearchSubmit,
}) => {
  const [text, setText] = useState(searchValue);
  useEffect(() => {
    const timerId = setTimeout(() => {
      handleSearchValue(text);
    }, 800);
    return () => {
      clearTimeout(timerId);
    };
  }, [text]);
  const handleSelect = (e, label) => {
    handleFilters({ [label]: e.target.value });
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
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
            {filters.map((filter) => (
              <Box key={filter.label}>
                <FormControl variant="standard" sx={{ width: '100px', m: 2 }}>
                  <InputLabel id={`${filter.label}-label`}>
                    {titleCase(filter.label)}
                  </InputLabel>
                  <Select
                    labelId={`${filter.label}-label`}
                    id={filter.label}
                    value={filtersValues[filter.label]}
                    onChange={(e) => handleSelect(e, filter.label)}
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
