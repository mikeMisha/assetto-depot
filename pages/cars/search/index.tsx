import Search from '../../../src/components/Search';
import { useState, useEffect } from 'react';
import PaginatedCollection from '../../../src/components/PaginatedCollection';
import useFilters from '../../../src/hooks/useFilters';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useSelector, useDispatch } from 'react-redux';
import {
  updateTerm,
  updateFilters,
} from '../../../src/store/slices/carSearchSlice';
import { wrapper } from '../../../src/store/store';
import { carFilters } from '../../../src/lib/searchFilters';
import { supabase } from '../../../src/lib/initSupabase';
import type { Filter } from '../../../src/types/global';
import type { CarSearchState } from '../../../src/store/slices/carSearchSlice';
import { RootState } from '../../../src/store/store';

interface car {
  id: number;
  brand: string;
  name: string;
  image: string;
  downloadLink: string;
  dislikes: number;
  downloads: number;
  trans: 'auto' | 'manual';
  credit: string;
  category: string;
}

interface CarPageProps {
  cars: car[];
  filters: Filter[];
}
const CarPage = (props: CarPageProps) => {
  const { cars, filters } = props;

  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.carSearch.term);
  const activeFilters = useSelector(
    (state: RootState) => state.carSearch.filters
  );
  const filteredCars = useFilters(activeFilters, cars);

  const [resultsData, setResultsData] = useState(filteredCars);

  useEffect(() => {
    if (searchValue) {
      const filterByTerm = filteredCars.filter((car) =>
        car.name.toLowerCase().includes(searchValue)
      );
      setResultsData(filterByTerm);
    } else {
      setResultsData(filteredCars);
    }
  }, [filteredCars, searchValue]);

  const handleFilters = (filterObj: Partial<CarSearchState['filters']>) => {
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
          CARS
        </Typography>
        <Typography variant="subtitle1" align="center">
          Search through hundreds of verified cars!
        </Typography>
      </Box>

      <Search
        filters={filters}
        activeFilters={activeFilters}
        handleFilters={handleFilters}
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
      />
      <PaginatedCollection
        dataType="cars"
        hasResults={!!resultsData?.length}
        data={resultsData}
      />
    </>
  );
};
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const { data: cars, error } = await supabase.from('cars').select();

  //TODO: Handle the erro r
  if (error) console.error(error);

  return {
    props: {
      cars: cars ? cars.sort((a, b) => a.id - b.id) : [],
      filters: carFilters,
    },
    revalidate: 10,
  };
});
export default CarPage;