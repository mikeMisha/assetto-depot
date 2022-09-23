import ContentPage from '../../../src/components/ContentPage';
import Image from 'next/image';
import Box from '@mui/material/Box';
import carBrands from '../../../src/lib/carBrands';
import { supabase } from '../../../src/lib/initSupabase';
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
      <ContentPage data={brandCars} hasResults={Boolean(brandCars?.length)} />
    </>
  );
}
export function getStaticPaths() {
  return {
    fallback: false,
    paths: carBrands.map((brand) => ({
      params: { brandName: brand },
    })),
  };
}

export async function getStaticProps(context) {
  const carBrand = context.params.brandName;
  const { data: cars, error } = await supabase.from('cars').select();
  return {
    props: {
      brandCars: cars.filter((car) => car.brand === carBrand),
      brand: carBrand,
    },
  };
}

export default CarBrandPage;
