import react from 'react';
import CarForm from '../../../src/components/layout/CarForm';
import FormWrapper from '../../../src/components/layout/FormWrapper';
const defaultValues = {
  name: '',
  category: '',
  link: '',
  credit: '',
  brand: '',
  trans: '',
  img: null,
};
const CarFormPage = () => {
  return (
    <FormWrapper
      defaultValues={defaultValues}
      FormComponent={CarForm}
      title="Car Submission Form"
    />
  );
};
export default CarFormPage;
