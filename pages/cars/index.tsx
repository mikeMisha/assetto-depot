import { wrapper } from '../../src/store/store';
import ContentList from '../../src/components/ContentList';
import Card from '@mui/material/Card';
import Box from '@mui/system/Box';
import Image from 'next/image';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Search from '../../src/components/Search';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTerm,
  updateFilters,
} from '../../src/store/slices/carSearchSlice';
import type { CarSearchState } from '../../src/store/slices/carSearchSlice';
import { RootState } from '../../src/store/store';
import { carFilters } from '../../src/lib/searchFilters';
import { Filter } from '../../src/types/global';
import { supabase } from '../../src/lib/initSupabase';

interface carPageProps {
  filters: Filter[];
}

interface Car {
  id: number;
  name: string;
}

function carPage(props: carPageProps) {
  const { filters } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.carSearch.term);
  const activeFilters = useSelector(
    (state: RootState) => state.carSearch.filters
  );

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

  const handleSearchSubmit = () => {
    router.push({
      pathname: '/cars/search',
    });
  };
  return (
    <>
      <Box sx={{ pt: 3 }}>
        <Typography component="h2" align="center" variant="h2">
          CARS
        </Typography>
        <Typography variant="subtitle1" align="center">
          Find cars by brand or search through hundreds of verified cars!
        </Typography>
      </Box>

      <Search
        filters={filters}
        activeFilters={activeFilters}
        handleFilters={handleFilters}
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
        handleSearchSubmit={handleSearchSubmit}
      />
      <ContentList colBreakPoints={[3, 6, 8]}>
        {(filters.find((filter) => filter.value === 'brand')?.items || []).map(
          (brand) => (
            <Link component={NextLink} href={`/cars/${brand}`} key={brand}>
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
          )
        )}
      </ContentList>
    </>
  );
}
export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  () => async () => {
    const { data: cars, error } = await supabase.from<Car>('tracks').select();
    // TODO: Handle the error
    if (error) console.error(error);

    return {
      props: {
        cars: cars,
        filters: carFilters,
      },
    };
  }
);
export default carPage;
