import TrackForm from '../../../src/components/TrackForm';
import FormWrapper from '../../../src/components/FormWrapper';

const defaultValues = {
  name: '',
  description: '',
  category: '',
  trackType: '',
  version: 0,
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
