import PaginatedCollection from '../../../src/components/PaginatedCollection';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { carBrands } from '../../../src/data/carBrands.json';
import { supabase } from '../../../src/lib/initSupabase';
import type { Car } from '../../../src/types/global';

interface CarBrandPageProps {
  brandCars: string[];
  brand: string;
}
function CarBrandPage(props: CarBrandPageProps) {
  const { brandCars, brand } = props;
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Image
          src={`/images/brand-logos/${brand}.png`}
          width={240}
          height={180}
        />
      </Box>
      <PaginatedCollection
        dataType="cars"
        data={brandCars}
        hasResults={Boolean(brandCars?.length)}
      />
    </>
  );
}
export function getStaticPaths() {
  return {
    fallback: false,
    paths: carBrands.map((brand: string) => ({
      params: { brandName: brand },
    })),
  };
}
// Define the expected shape of props
interface StaticProps {
  brandCars: Car[];
  brand: string;
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ brandName: string }>
): Promise<GetStaticPropsResult<StaticProps>> {
  // Ensure that brandName exists in the context params
  const carBrand = context.params?.brandName;

  if (!carBrand) {
    // Handle the case where brandName is not provided
    return {
      notFound: true,
    };
  }

  // Fetch the cars from the database
  const { data: cars, error } = await supabase.from<Car>('cars').select();

  if (error) {
    // Handle the case where the fetch fails
    console.error('Failed to fetch cars:', error.message);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      brandCars: cars.filter((car) => car.brand === carBrand),
      brand: carBrand,
    },
    revalidate: 10,
  };
}

export default CarBrandPage;
