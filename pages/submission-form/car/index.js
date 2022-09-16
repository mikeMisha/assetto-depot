import react from 'react';
import CarForm from '../../../src/components/CarForm';
import FormWrapper from '../../../src/components/FormWrapper';
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
