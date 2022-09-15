import ContentPage from '../../../src/components/layout/ContentPage';
import Image from 'next/image';
import Box from '@mui/material/Box';
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

function CarBrandPage({ brandCars, brand }) {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Image
          src={`/images/brand-logos/${brand}.png`}
          width={240}
          height={180}
        />
      </Box>
      <ContentPage data={brandCars} />
    </>
  );
}
export function getStaticPaths() {
  return {
    fallback: false,
    paths: BRAND_LIST.map((brand) => ({
      params: { brandName: brand },
    })),
  };
}

export function getStaticProps(context) {
  const carBrand = context.params.brandName;

  return {
    props: {
      brandCars: dummyData.filter((car) => car.brand === carBrand),
      brand: carBrand,
    },
  };
}

export default CarBrandPage;
