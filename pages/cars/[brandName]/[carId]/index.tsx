import DetailsPage from '../../../../src/components/DetailsPage';
import { supabase } from '../../../../src/lib/initSupabase';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

// Define TypeScript interfaces for the Car object and CarPage props
interface Car {
  id: number;
  brand: string;
  // Add other car properties here based on your data
}

interface CarPageProps {
  car: Car;
  type: string;
}

// Define the CarPage component with typed props
function CarPage({ car, type }: CarPageProps) {
  return <DetailsPage type={type} data={car} />;
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
    props: { car, type: 'cars' },
    revalidate: 10,
  };
};

export default CarPage;
