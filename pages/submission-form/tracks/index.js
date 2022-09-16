import TrackForm from '../../../src/components/trackForm';
import FormWrapper from '../../../src/components/FormWrapper';
const defaultValues = {
  name: '',
  description: '',
  category: '',
  type: '',
  version: '',
  location: '',
  link: '',
  credit: '',
  img: null,
};

const TrackFromPage = () => {
  return (
    <FormWrapper
      defaultValues={defaultValues}
      FormComponent={TrackForm}
      title="Track Submission Form"
    />
  );
};
export default TrackFromPage;
