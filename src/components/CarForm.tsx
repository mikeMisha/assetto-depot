import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';

import Button from '@mui/material/Button';

import { Box, InputLabel } from '@mui/material';

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

export interface CarFormProps {
  formValues: {
    name: string;
    category: string;
    link: string;
    credit: string;
    brand: string;
    trans: string;
    img: File | null;
  };
  handleTextFieldChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSelectChange: (event: SelectChangeEvent) => void;
  handleUploadChange: React.ChangeEventHandler<HTMLInputElement>;
}

function CarForm(props: CarFormProps) {
  const {
    formValues,
    handleTextFieldChange,
    handleSelectChange,
    handleUploadChange,
  } = props;

  return (
    <Grid container spacing={3} alignItems="center" component="div">
      <Grid xs={12} md={6} item>
        <TextField
          id="brand-input"
          name="brand"
          label="Brand"
          type="text"
          fullWidth
          value={formValues.brand}
          onChange={handleTextFieldChange}
          required
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          fullWidth
          id="name-input"
          name="name"
          label="Car Name"
          type="text"
          value={formValues.name}
          onChange={handleTextFieldChange}
          required
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          fullWidth
          id="link-input"
          name="link"
          label="Download Link"
          type="text"
          value={formValues.link}
          onChange={handleTextFieldChange}
          required
        />
      </Grid>
      <Grid xs={12} md={6} item>
        <TextField
          fullWidth
          id="credit-input"
          name="credit"
          label="Credit/Author"
          type="text"
          value={formValues.credit}
          onChange={handleTextFieldChange}
          required
        />
      </Grid>
      <Grid xs={12} sm={6} item>
        <FormControl required sx={{ minWidth: '130px' }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            name="category"
            value={formValues.category}
            onChange={handleSelectChange}
            label="category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6} item>
        <FormControl required sx={{ width: '195px' }}>
          <FormLabel>Transmission:</FormLabel>
          <RadioGroup
            name="trans"
            value={formValues.trans}
            onChange={handleTextFieldChange}
            row
          >
            <FormControlLabel
              key="auto"
              value="auto"
              control={<Radio size="small" />}
              label="Auto"
            />
            <FormControlLabel
              key="manual"
              value="manual"
              control={<Radio size="small" />}
              label="Manual"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid xs={12} item>
        <Box>
          <FormLabel sx={{ mb: 1 }} component="div">
            Select Car Image:
          </FormLabel>
          <input
            onChange={handleUploadChange}
            type="file"
            name="image"
            accept=".jpg, .png, .jpeg"
            required
          />
        </Box>
      </Grid>
      <Grid xs={12} item component="div" display="flex" justifyContent="center">
        <Button size="large" variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default CarForm;
