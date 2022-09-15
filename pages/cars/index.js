import ContentList from '../../src/components/layout/ContentList';
import Card from '@mui/material/Card';
import Box from '@mui/system/Box';
import Image from 'next/image';

import Link from '../../src/Link';
import Button from '@mui/material/Button';
import Search from '../../src/components/layout/Search';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
const BRAND_LIST = [
  'aston-martin',
  'acura',
  'alfa-romeo',
  'audi',
  'bentley',
  'bmw',
  'bugatti',
  'chevrolet',
  'citroen',
  'datsun',
  'dodge',
  'ds',
  'ferrari',
  'fiat',
  'honda',
  'hyundai',
  'infiniti',
  'jaguar',
  'jeep',
  'kia',
  'koenigsegg',
  'lamborghini',
  'land-rover',
  'lexus',
  'lotus',
  'maserati',
  'maybach',
  'mazda',
  'mclaren',
  'mercedes-benz',
  'mini',
  'mitsubishi',
  'nissan',
  'noble',
  'pagani',
  'peugeot',
  'porsche',
  'renault',
  'rolls-royce',
  'ruf',
  'saab',
  'subaru',
  'tesla',
  'toyota',
  'tvr',
  'volkswagen',
  'volvo',
];

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
  { label: 'brand', items: BRAND_LIST },
];

const dummyData = [
  {
    id: '1',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },

  {
    id: '2',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },
  {
    id: '3',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },
  {
    id: '4',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },
  {
    id: '5',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },
  {
    id: '6',
    brand: 'datsun',
    name: 'Datsun 720 KC Drift',
    image:
      'https://assettocorsa.club/assets/template/images/auto/datsun-720-kc-drift/large/image1.jpg',
    downloadLink:
      'https://files.assettocorsaclub.com/file/acclub-files/33a1f9/datsun_720_drift_2018.rar',
    likes: '10',
    dislikes: '0',
    downloads: '5',
    trans: 'manual',
    tags: ['drift', 'japan', 'truck', 'night'],
    credit: 'N/A',
    category: 'drift',
  },
];

function carPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [filtersValues, setFiltersValues] = useState({
    category: '',
    brand: '',
  });

  const handleFilters = (filterObj) => {
    setFiltersValues((prevFilter) => ({ ...prevFilter, ...filterObj }));
  };

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = () => {
    router.push({
      pathname: '/cars/search',
      query: { ...filtersValues, searchTerm: searchValue },
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
        filters={FILTERS}
        filtersValues={filtersValues}
        handleFilters={handleFilters}
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
        handleSearchSubmit={handleSearchSubmit}
      />
      <ContentList maxCols="4" colBreakPoints={[3, 6, 8]}>
        {BRAND_LIST.map((brand) => (
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

export default carPage;

/** <ContentList maxCols="4" colBreakPoints={[2, 4, 6]}>
      {BRAND_LIST.map((brand) => (
        <Card sx={{ width: '100%' }}>
          <Box sx={{ position: 'relative' }}></Box>
          <Image
            src={`/images/car-logos/${brand}.png`}
            layout={'fill'}
            objectFit={'contain'}
            alt=""
          />
        </Card>
      ))}
    </ContentList> */
