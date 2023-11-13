import { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import NextLink from 'next/link';
import Link from '@mui/material/Link';

import { SelectChangeEvent } from '@mui/material/Select';

interface FormWrapperProps<FormValuesType> {
  defaultValues: FormValuesType;
  FormComponent: React.ComponentType<{
    formValues: FormValuesType;
    handleTextFieldChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleSelectChange: (event: SelectChangeEvent) => void;
    handleUploadChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }>;
  title: string;
}

const FormWrapper = <
  FormValuesType extends { [key: string]: string | Blob | null | number }
>({
  defaultValues,
  FormComponent,
  title,
}: FormWrapperProps<FormValuesType>) => {
  const [formValues, setFormValues] = useState<FormValuesType>(defaultValues);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      img: e.target.files ? e.target.files[0] : null,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    let formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        // FormData.append accepts strings, so we need to convert numbers to strings
        formData.append(key, value.toString());
      } else if (value instanceof Blob) {
        // For Blob and File types
        formData.append(key, value);
      }
    });

    axios
      .post('/api/submission', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function () {
        console.log('SUCCESS!!');
        setIsLoading(false);
        setSubmitted(true);
      })
      .catch(function (error) {
        setIsLoading(false);
        if (error.response.status == 552) {
          alert(error.response.data.error);
        } else {
          alert('Encountered Error. Please try again.');
        }
      });
  };
  if (submitted) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 200,
            px: 4,
          }}
        >
          <CheckCircleIcon color="primary" sx={{ fontSize: '3rem' }} />
          <Typography align="center" variant="h4">
            Form submitted for review! Thank you!
          </Typography>
          <Link component={NextLink} href="/">
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              Return Home
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Typography component="h2" align="center" variant="h1" sx={{ mt: 4 }}>
        {title}
      </Typography>

      <Box
        sx={{
          my: 5,
          maxWidth: '800px',
          mx: 'auto',
          px: '5rem',
          position: 'relative',
        }}
      >
        {isLoading && (
          <Box
            sx={[
              (theme) => ({
                bgcolor: theme.palette.secondary.main + 'B3',
              }),
              {
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: 10,
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <CircularProgress size="4rem" sx={{}} />
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <FormComponent
            formValues={formValues}
            handleTextFieldChange={handleTextFieldChange}
            handleSelectChange={handleSelectChange}
            handleUploadChange={handleUploadChange}
          />
        </form>
      </Box>
    </>
  );
};

export default FormWrapper;
