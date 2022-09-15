import Search from '../../src/components/layout/Search';
import { useState, useEffect } from 'react';
import ContentPage from '../../src/components/layout/ContentPage';
import useFilters from '../../src/hooks/useFilters';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import tracksJSON from '../../tracks.json';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTerm,
  updateFilters,
} from '../../src/store/slices/trackSearchSlice';
import { wrapper } from '../../src/store/store';

const FILTERS = [
  {
    label: 'category',
    items: ['circuit', 'drift', 'touge', 'kart', 'rally', 'street'],
  },
  { label: 'type', items: ['loop', 'street', 'a to b'] },
];

const TracksPage = ({ tracks, filters }) => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.trackSearch.term);
  const filtersValues = useSelector((state) => state.trackSearch.filters);
  const filteredTracks = useFilters(filtersValues, tracks);
  const [resultsData, setResultsData] = useState(filteredTracks);

  useEffect(() => {
    if (searchValue) {
      const filterByTerm = filteredTracks.filter((track) =>
        track.name.toLowerCase().includes(searchValue)
      );
      setResultsData(filterByTerm);
    } else {
      setResultsData(filteredTracks);
    }
  }, [filteredTracks, searchValue]);

  const handleFilters = (filterObj) => {
    dispatch(updateFilters(filterObj));
  };

  const handleSearchValue = (value) => {
    dispatch(updateTerm(value));
  };
  return (
    <>
      <Box sx={{ pt: 3 }}>
        <Typography component="h2" align="center" variant="title">
          TRACKS
        </Typography>
        <Typography variant="subtitle1" align="center">
          Search through hundreds of verified tracks!
        </Typography>
      </Box>

      <Search
        filters={filters}
        filtersValues={filtersValues}
        handleFilters={handleFilters}
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
      />
      <ContentPage data={resultsData} />
    </>
  );
};
export const getStaticProps = wrapper.getStaticProps((store) => () => {
  return {
    props: {
      tracks: tracksJSON.tracks,
      filters: FILTERS,
    },
  };
});
export default TracksPage;
