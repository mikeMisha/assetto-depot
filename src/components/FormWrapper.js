import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { Box, InputLabel, Typography } from '@mui/material';
import Link from 'next/link';

const categories = [
  'f1',
  'drift',
  'touge',
  'karting',
  'fictional',
  'nascar',
  'rally',
  'street',
];

const defaultValues = {
  name: '',
  category: '',
  link: '',
  credit: '',
  brand: '',
  trans: '',
  img: null,
};
const FormWrapper = ({ defaultValues, FormComponent, title }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleUploadChange = (e) => {
    setFormValues({ ...formValues, img: e.target.files[0] });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    let formData = new FormData();

    for (var key in formValues) {
      formData.append(key, formValues[key]);
    }

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
          <Link href="/">
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
      <Typography component="h2" align="center" variant="title" sx={{ mt: 4 }}>
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
            handleInputChange={handleInputChange}
            handleUploadChange={handleUploadChange}
          />
        </form>
      </Box>
    </>
  );
};
export default FormWrapper;
