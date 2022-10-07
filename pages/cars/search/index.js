import Search from '../../../src/components/Search';
import { useState, useEffect } from 'react';
import ContentPage from '../../../src/components/ContentPage';
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

const CarPage = ({ cars, filters }) => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.carSearch.term);
  const filtersValues = useSelector((state) => state.carSearch.filters);
  const filteredCars = useFilters(filtersValues, cars);

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
          CARS
        </Typography>
        <Typography variant="subtitle1" align="center">
          Search through hundreds of verified cars!
        </Typography>
      </Box>

      <Search
        filters={filters}
        filtersValues={filtersValues}
        handleFilters={handleFilters}
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
      />
      <ContentPage
        dataType="cars"
        hasResults={resultsData?.length}
        data={resultsData}
      />
    </>
  );
};
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const { data: cars, error } = await supabase.from('cars').select();
  return {
    props: {
      cars: cars.sort((a, b) => a.id - b.id),
      filters: carFilters,
    },
    revalidate: 10,
  };
});
export default CarPage;
