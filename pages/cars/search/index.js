import { useRouter } from 'next/router';
import ContentPage from '../../../src/components/layout/ContentPage';
import Search from '../../../src/components/layout/Search';
import { useState } from 'react';

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

function searchResults({ cars, currQuery }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(currQuery.searchTerm);
  const [filtersValues, setFiltersValues] = useState({
    category: currQuery.category,
    brand: currQuery.brand,
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
      <Search
        filters={FILTERS}
        filtersValues={filtersValues}
        handleFilters={handleFilters}
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
        handleSearchSubmit={handleSearchSubmit}
      />
      <ContentPage data={cars} />
    </>
  );
}

export function getServerSideProps(context) {
  const { category, brand, searchTerm } = context.query;

  const filteredData = dummyData.filter((car) => {
    if (category && car.category !== category) {
      return false;
    }
    if (brand && car.brand !== brand) {
      return false;
    }
    if (searchTerm && !car.name.toLowerCase().includes(searchTerm)) {
      return false;
    }
    return true;
  });
  return {
    props: { cars: filteredData, currQuery: context.query },
  };
}

export default searchResults;
