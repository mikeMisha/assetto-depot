import { wrapper } from '../../src/store/store';
import ContentList from '../../src/components/ContentList';
import Card from '@mui/material/Card';
import Box from '@mui/system/Box';
import Image from 'next/image';
import Link from '../../src/components/Link';
import Button from '@mui/material/Button';
import Search from '../../src/components/Search';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTerm,
  updateFilters,
} from '../../src/store/slices/carSearchSlice';
import dataJSON from '../../data.json';

function carPage({ filters }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.carSearch.term);
  const filtersValues = useSelector((state) => state.carSearch.filters);

  const handleFilters = (filterObj) => {
    dispatch(updateFilters(filterObj));
  };

  const handleSearchValue = (value) => {
    dispatch(updateTerm(value));
  };

  const handleSearchSubmit = () => {
    router.push({
      pathname: '/cars/search',
    });
  };
  return (
    <>
      <Box sx={{ pt: 3 }}>
        <Typography component="h2" align="center" variant="title">
          CARS
        </Typography>
        <Typography variant="subtitle1" align="center">
          Find cars by brand or search through hundreds of verified cars!
        </Typography>
      </Box>

      <Search
        filters={filters}
        filtersValues={filtersValues}
        handleFilters={handleFilters}
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
        handleSearchSubmit={handleSearchSubmit}
      />
      <ContentList maxCols="4" colBreakPoints={[3, 6, 8]}>
        {filters
          .find((filter) => filter.label === 'brand')
          .items.map((brand) => (
            <Link href={`/cars/${brand}`} key={brand}>
              <Button sx={{ width: '100%' }}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: '1',
                    width: '100%',
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flex: '1',
                    }}
                  >
                    <Box
                      component="div"
                      sx={{
                        width: '100%',
                      }}
                    >
                      <Image
                        src={`/images/brand-logos/${brand}.png`}
                        layout="responsive"
                        width={240}
                        height={180}
                        priority
                      />
                    </Box>
                  </Box>
                </Card>
              </Button>
            </Link>
          ))}
      </ContentList>
    </>
  );
}
export const getStaticProps = wrapper.getStaticProps((store) => () => {
  return {
    props: {
      filters: dataJSON.carFilters,
    },
  };
});
export default carPage;
