import Box from '@mui/system/Box';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { SelectChangeEvent } from '@mui/material/Select';
import { SortValue } from '../types/global';

const PAGE_SIZES = [15, 25, 50, 100];

interface ContentPaginationProps {
  data: any[];
  isSingleCol?: boolean;
  children: React.ReactNode;
  pageSize: number;
  currentPage: number;
  updatePage: (e: React.ChangeEvent<unknown>, page: number) => void;
  updatePerPage: (e: SelectChangeEvent) => void;
  handleColChange: (isSingleCol: boolean) => void;
  handleSort: (e: SelectChangeEvent) => void;
  sortValue: SortValue;
}

const ContentPagination = (props: ContentPaginationProps) => {
  const {
    data,
    isSingleCol,
    children,
    pageSize,
    currentPage,
    updatePage,
    updatePerPage,
    handleColChange,
    handleSort,
    sortValue,
  } = props;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexShrink: 0,
          borderTop: 'solid 3px #fdb826',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            my: 3,
            px: '10%',
            flexWrap: 'wrap',
            gap: 3,
            maxWidth: '1600px',
            width: '100%',

            '@media (max-width:900px)': {
              justifyContent: 'center',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              width: '200px',
              '@media (max-width:900px)': {
                display: 'none',
              },
            }}
          >
            <Button
              variant={isSingleCol ? 'contained' : 'text'}
              sx={{ p: 0, minWidth: 'fit-content' }}
              onClick={() => handleColChange(true)}
            >
              <ViewAgendaIcon fontSize="large" />
            </Button>
            <Button
              variant={isSingleCol ? 'text' : 'contained'}
              sx={{ p: 0, minWidth: 'fit-content' }}
              onClick={() => handleColChange(false)}
            >
              <ViewModuleIcon fontSize="large" />
            </Button>
          </Box>

          <Pagination
            count={Math.ceil(data.length / pageSize)}
            size="large"
            page={currentPage}
            variant="outlined"
            onChange={updatePage}
            sx={{ display: 'flex', alignItems: 'center' }}
          />
          <Stack spacing={3} direction="row">
            <FormControl variant="standard" sx={{ minWidth: '100px' }}>
              <InputLabel id="sort-label">Sort</InputLabel>
              <Select
                labelId="sort-label"
                value={sortValue || 'top rated'}
                label="sort"
                onChange={handleSort}
                sx={{ maxWidth: '100px' }}
                autoWidth
              >
                <MenuItem value="top rated">Top rated</MenuItem>
                <MenuItem value="most downloads">Most downloads</MenuItem>
                <MenuItem value="a-z">A-Z</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: '100px' }}>
              <InputLabel id="rows-label">{`${pageSize} per page`}</InputLabel>
              <Select
                labelId="rows-label"
                value={pageSize.toString()}
                label={`${pageSize} per page`}
                onChange={updatePerPage}
                autoWidth
                sx={{ maxWidth: '60px' }}
              >
                {PAGE_SIZES.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Box>

      {children}

      <Box
        sx={{
          display: 'flex',
          flexShrink: 0,
          justifyContent: 'center',
          py: 3,
          borderBottom: 'solid 3px #fdb826',
        }}
      >
        <Pagination
          count={Math.ceil(data.length / pageSize)}
          size="large"
          page={currentPage}
          variant="outlined"
          onChange={(e, page) => {
            updatePage(e, page);
            window.scrollTo(0, 0);
          }}
        />
      </Box>
    </>
  );
};

export default ContentPagination;
