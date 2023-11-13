import DetailsPage from '../../../../src/components/DetailsPage';
import { supabase } from '../../../../src/lib/initSupabase';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import type { Car } from '../../../../src/types/global';

interface CarPageProps {
  car: Car;
}

// Define the CarPage component with typed props
function CarPage({ car }: CarPageProps) {
  return <DetailsPage data={car} dataCategory="cars" />;
}

// Type for getStaticPaths context params
interface Params extends ParsedUrlQuery {
  carId: string;
}
export const getStaticPaths: GetStaticPaths = async () => {
  const { data: cars, error } = await supabase.from<Car>('cars').select();

  // Handle the error if needed
  if (error) {
    console.error(error);
    // Provide a fallback or handle the error as needed
    return { paths: [], fallback: false };
  }

  return {
    fallback: false,
    paths: cars.map((car) => ({
      params: { brandName: car.brand, carId: car.id.toString() },
    })),
  };
};

// Define the type for getStaticProps context
export const getStaticProps: GetStaticProps<CarPageProps, Params> = async (
  context: GetStaticPropsContext<Params>
) => {
  const carId = context.params?.carId;

  // If carId is not defined, return an error state
  if (!carId) {
    return { notFound: true };
  }

  const { data: car, error } = await supabase
    .from<Car>('cars')
    .select()
    .eq('id', carId)
    .single();

  if (error || !car) {
    console.error(error);
    return { notFound: true };
  }

  return {
    props: { car },
    revalidate: 60 * 60, // Revalidate once every hour
  };
};

export default CarPage;
