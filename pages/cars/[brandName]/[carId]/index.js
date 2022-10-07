import DetailsPage from '../../../../src/components/DetailsPage';
import { supabase } from '../../../../src/lib/initSupabase';

function CarPage({ car, type }) {
  return <DetailsPage type={type} data={car} />;
}

export async function getStaticPaths() {
  const { data: cars, error } = await supabase.from('cars').select();
  return {
    fallback: false,

    paths: cars.map((car) => ({
      params: { brandName: car.brand, carId: car.id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const carId = context.params.carId;
  const { data: car, error } = await supabase
    .from('cars')
    .select()
    .eq('id', carId);
  return {
    props: { car: car[0], type: 'cars' },
    revalidate: 10,
  };
}

export default CarPage;
