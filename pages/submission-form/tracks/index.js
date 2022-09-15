import TrackForm from '../../../src/components/layout/trackForm';
import FormWrapper from '../../../src/components/layout/FormWrapper';
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
