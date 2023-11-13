import Search from '../../src/components/Search';
import { useState, useEffect } from 'react';
import PaginatedCollection from '../../src/components/PaginatedCollection';
import useFilters from '../../src/hooks/useFilters';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTerm,
  updateFilters,
} from '../../src/store/slices/trackSearchSlice';
import { wrapper } from '../../src/store/store';
import { trackFilters } from '../../src/lib/searchFilters';
import { supabase } from '../../src/lib/initSupabase';
import { RootState } from '../../src/store/store';
import { GetStaticProps } from 'next';
import type { Filter } from '../../src/types/global';
import type { TrackSearchState } from '../../src/store/slices/trackSearchSlice';

interface Track {
  id: number;
  name: string;
}

interface TracksPageProps {
  tracks: Track[];
  filters: Filter[];
}
const TracksPage = (props: TracksPageProps) => {
  const { tracks, filters } = props;
  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.trackSearch.term);
  const activeFilters = useSelector(
    (state: RootState) => state.trackSearch.filters
  );
  const filteredTracks = useFilters(activeFilters, tracks);

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

  const handleFilters = (filterObj: Partial<TrackSearchState['filters']>) => {
    const newFilters = {
      ...activeFilters,
      ...filterObj,
    };

    dispatch(updateFilters(newFilters));
  };

  const handleSearchValue = (value: string) => {
    dispatch(updateTerm(value));
  };
  return (
    <>
      <Box sx={{ pt: 3 }}>
        <Typography component="h2" align="center" variant="h2">
          TRACKS
        </Typography>
        <Typography variant="subtitle1" align="center">
          Search through hundreds of verified tracks!
        </Typography>
      </Box>

      <Search<TrackSearchState['filters']>
        filters={filters}
        activeFilters={activeFilters}
        handleFilters={handleFilters}
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
      />
      <PaginatedCollection
        dataCategory="tracks"
        hasResults={!!resultsData?.length}
        data={resultsData}
      />
    </>
  );
};
export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    const { data: tracks, error } = await supabase
      .from<Track>('tracks')
      .select();

    // Handle the error if needed
    if (error) console.error(error);

    return {
      props: {
        tracks: tracks ? tracks.sort((a, b) => a.id - b.id) : [],
        filters: trackFilters,
      },
      revalidate: 10,
    };
  }
);
export default TracksPage;
