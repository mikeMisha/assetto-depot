import Search from '../../../src/components/Search';
import { useState, useEffect } from 'react';
import ContentPage from '../../../src/components/ContentPage';
import useFilters from '../../../src/hooks/useFilters';
import useUserSearched from '../../../src/hooks/useUserSearched';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import carsJSON from '../../../cars.json';
import brandsJSON from '../../../brands.json';
import dataJSON from '../../../data.json';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTerm,
  updateFilters,
} from '../../../src/store/slices/carSearchSlice';
import { wrapper } from '../../../src/store/store';

const FILTERS = [
  {
    label: 'category',
    items: [
      'f1',
      'drift',
      'touge',
      'karting',
      'fictional',
      'nascar',
      'rally',
      'street',
    ],
  },
  { label: 'brand', items: brandsJSON.brands },
];

const CarPage = ({ cars, filters }) => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.carSearch.term);
  const filtersValues = useSelector((state) => state.carSearch.filters);
  const filteredCars = useFilters(filtersValues, cars);

  const [resultsData, setResultsData] = useState(filteredCars);

  useEffect(() => {
    console.log(filtersValues, filteredCars);
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
      <ContentPage hasResults={resultsData?.length} data={resultsData} />
    </>
  );
};
export const getStaticProps = wrapper.getStaticProps((store) => () => {
  return {
    props: {
      cars: carsJSON.cars,
      filters: dataJSON.carFilters,
    },
  };
});
export default CarPage;
